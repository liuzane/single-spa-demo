declare global {
  enum RouterModeEnum {
    Hash = 'hash',
    HTML5 = 'html5',
    Memory = 'memory'
  }

  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: RouterModeEnum;
    VITE_API_ADDRESS: string;
  }
}

// just add this line code make global.d.ts works
export {}