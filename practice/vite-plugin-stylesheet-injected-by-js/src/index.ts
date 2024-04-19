// Types
import type { Plugin } from 'vite';
import type { OutputOptions, OutputBundle, OutputAsset, OutputChunk } from 'rollup';

const getCode = (origin: string, varName: string, entryCssFileName: string) =>
  `
var nescafe = {
  stylesheets: [],
  mount: function() {
    if (this.stylesheets.length > 0) {
      this.stylesheets.forEach((element) => document.head.appendChild(element));
    }
  },
  unmount: function() {
    this.stylesheets = document.querySelectorAll('link[rel="stylesheet"][href^="${origin}"][href$=".css"]');
    this.stylesheets.forEach((element) => element.remove());
  }
};
try {
  if (window.nescafe) {
    window.nescafe['${varName}'] = nescafe;
  } else {
    window.nescafe={ ${varName}: nescafe };
  }
  if (typeof document !== 'undefined') {
    var elementLink=document.createElement('link');
    elementLink.setAttribute('rel', 'stylesheet');
    elementLink.setAttribute('href', '${origin}/${entryCssFileName}');
    document.head.appendChild(elementLink);
  }
} catch (e) {
  console.error('my-plugin-stylesheet-injected-by-js', e);
}`.replace(/(?<!var|typeof)[\s\n\r]+/g, '');

export function viteStylesheetInjectPlugin(origin: string = '', varName: string): Plugin {
  return {
    name: 'vite-plugin-stylesheet-injected-by-js',
    enforce: 'post',
    generateBundle(_options: OutputOptions, bundle: OutputBundle, _isWrite: boolean) {
      const bundles: (OutputAsset | OutputChunk)[] = Object.values(bundle);
      const entryFile = bundles.find(item => item.type === 'chunk' && item.isEntry) as OutputChunk | null;
      if (entryFile) {
        const entryCssFile = bundles.find(
          item => item.type === 'asset' && item.name === entryFile.name + '.css'
        ) as OutputAsset | null;
        if (entryCssFile) {
          entryFile.code = getCode(origin, varName, entryCssFile?.fileName) + entryFile.code;
        }
      }
    }
  };
}

export function viteIgnoreStaticImport(importKeys: string[]): Plugin {
  return {
    name: 'vite-plugin-ignore-static-import',
    enforce: 'pre',
    // 1. insert to optimizeDeps.exclude to prevent pre-transform
    config(config) {
      config.optimizeDeps = {
        ...(config.optimizeDeps ?? {}),
        exclude: [...(config.optimizeDeps?.exclude ?? []), ...importKeys]
      };
    },
    // 2. push a plugin to rewrite the 'vite:import-analysis' prefix
    configResolved(resolvedConfig) {
      const VALID_ID_PREFIX = `/@id/`;
      const reg = new RegExp(`${VALID_ID_PREFIX}(${importKeys.join('|')})`, 'g');
      resolvedConfig.plugins.push({
        name: 'vite-plugin-ignore-static-import-replace-idprefix',
        transform: code => (reg.test(code) ? code.replace(reg, (m, s1) => s1) : code)
      });
    },
    // 3. rewrite the id before 'vite:resolve' plugin transform to 'node_modules/...'
    resolveId: id => {
      if (importKeys.includes(id)) {
        return { id, external: true };
      }
    }
  };
}
