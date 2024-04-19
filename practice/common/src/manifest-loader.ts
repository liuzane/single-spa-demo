export interface IOptions {
  mode: ModeEnum;
  origin?: string;
  dirname?: string;
  ignoreEntryFile?: boolean;
  framework?: string;
}

export enum ModeEnum {
  Development = 'development',
  Production = 'production'
}

export interface IManifest {
  file: string;
  name: string;
  src: string;
  isEntry: boolean;
  isDynamicEntry: boolean;
  imports: string[];
  dynamicImports: string[];
  css: string[];
}

// Why have this loader? see https://vitejs.dev/guide/backend-integration.html
export class ManifestLoader {
  readonly mode: string;
  readonly origin: string;
  readonly dirname: string;
  readonly ignoreEntryFile: boolean;
  public resources: NodeListOf<Element>;
  public manifest: Record<string, IManifest>;

  constructor(options: IOptions) {
    this.mode = options.mode || ModeEnum.Development;
    this.origin = options.origin || '';
    this.dirname = options.dirname || '';
    this.ignoreEntryFile = Boolean(options.ignoreEntryFile);
    this.init();
  }

  /** Initialize */
  private init() {
    switch (this.mode) {
      case ModeEnum.Development: {
        break;
      }

      case ModeEnum.Production: {
        this.queryManifestData();
        break;
      }
    }
  }

  /** Load resource files */
  public mount(): void {
    // If the resource files is already loaded, push the resource files in document head
    if (this.resources?.length > 0) {
      this.resources.forEach((element: Element) => document.head.appendChild(element));
    }
  }

  /** Remove all resource files */
  public unmount(): void {
    // Grab all resource files in document head and remove them.
    switch (this.mode) {
      case ModeEnum.Development: {
        this.resources = document.head.querySelectorAll(
          `style[type="text/css"][data-vite-dev-id^="${this.dirname}"][data-vite-dev-id$=".css"]`
        );
        this.resources.forEach((element: Element) => element.remove());
        break;
      }

      case ModeEnum.Production: {
        this.resources = document.head.querySelectorAll(
          `link[rel^="stylesheet"][href^="${this.origin}"],link[rel$="modulepreload"][href^="${this.origin}"]`
        );
        this.resources.forEach((element: Element) => element.remove());
        break;
      }
    }
  }

  /** Load manifest data */
  private queryManifestData() {
    fetch(`${this.origin}/.vite/manifest.json`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(
            'Unable to find .vite/manifest.json, please check build.manifest is true, see ' +
              'https://cn.vitejs.dev/config/build-options.html#build-manifest'
          );
        }
      })
      .then((data: Record<string, IManifest>) => {
        this.manifest = data;
        const entryKey: string | null = Object.keys(data).find(key => data[key].isEntry);
        if (entryKey) {
          this.loadRemoteResources(entryKey);
        }
      })
      .catch(error => console.error(error));
  }

  /** Load resources by manifest data */
  private loadRemoteResources(resourceKey: string): void {
    const resource: IManifest = this.manifest[resourceKey];
    if (resource) {
      // Entry file
      if (resource.isEntry) {
        if (!this.ignoreEntryFile) {
          this.loadScriptResource(resource.file);
        }
        if (resource.imports?.length > 0) {
          resource.imports.forEach((key: string) => {
            this.loadRemoteResources(key);
          });
        }
        if (resource.css?.length > 0) {
          resource.css.forEach((url: string) => {
            this.loadStyleSheetResource(url);
          });
        }
        // Entry file by import
      } else if (resource.dynamicImports?.length > 0) {
        if (resource.css?.length > 0) {
          resource.css.forEach((url: string) => {
            this.loadStyleSheetResource(url);
          });
        }
        resource.dynamicImports.forEach((key: string) => {
          this.loadRemoteResources(key);
        });
        // Dynamic entry file
      } else if (resource.isDynamicEntry) {
        this.loadPreloadScriptResource(resource.file);
        resource.css.forEach((url: string) => {
          this.loadStyleSheetResource(url, true);
        });
      }
    }
  }

  /** Load entry file in document head */
  private loadScriptResource(path: string): void {
    const url: string = `${this.origin}/${path}`;
    const existElement: Element | null = document.head.querySelector(`script[type="module"][src="${url}"]`);
    if (!existElement) {
      // Push the entry file in document head when entry file does not exist.
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'module');
      scriptElement.setAttribute('crossorigin', '');
      scriptElement.setAttribute('src', url);
      document.head.appendChild(scriptElement);
    }
  }

  /** Load css file in document head */
  private loadStyleSheetResource(path: string, onlyReplace?: boolean): void {
    const url: string = `${this.origin}/${path}`;
    const existElement: Element | null = document.head.querySelector(`link[rel="stylesheet"][href^="${url}"]`);
    if (existElement) {
      // If css file already exist, replace this element at the bottom of document head.
      document.head.appendChild(existElement);
    } else if (!onlyReplace) {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('href', url);
      document.head.appendChild(linkElement);
    }
  }

  /** Load chunk file in document head */
  private loadPreloadScriptResource(path: string, onlyReplace?: boolean): void {
    const url: string = `${this.origin}/${path}`;
    const existElement: Element | null = document.head.querySelector(`link[rel="modulepreload"][href="${url}"]`);
    if (existElement) {
      // If chunk file already exist, replace this element at the bottom of document head.
      document.head.appendChild(existElement);
    } else if (!onlyReplace) {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'modulepreload');
      linkElement.setAttribute('as', 'script');
      linkElement.setAttribute('crossorigin', '');
      linkElement.setAttribute('href', url);
      document.head.appendChild(linkElement);
    }
  }
}
