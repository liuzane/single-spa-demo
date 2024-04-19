declare module "@laboratory/common" {
  export function add(a: number, b: number): number;
}

declare module "@laboratory/manifest-loader" {
  export interface IOptions {
    mode: ModeEnum;
    origin?: string;
    dirname?: string;
    ignoreEntryFile?: boolean;
    framework?: string;
  }
  export declare enum ModeEnum {
    Development = "development",
    Production = "production",
  }
  export declare enum FrameworkEnum {
    None = "none",
    Normal = "normal",
    React = "react",
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
  export declare class ManifestLoader {
    readonly mode: string;
    readonly origin: string;
    readonly dirname: string;
    readonly ignoreEntryFile: boolean;
    readonly framework: string;
    resources: NodeListOf<Element>;
    manifest: Record<string, IManifest>;
    constructor(options: IOptions);
    private init;
    mount(): void;
    unmount(): void;
    private queryManifestData;
    private loadRemoteResources;
    private loadScriptResource;
    private loadStyleSheetResource;
    private loadPreloadScriptResource;
  }
}
