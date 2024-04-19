declare global {
  enum RouterModeEnum {
    Hash = 'hash',
    HTML5 = 'html5',
    Memory = 'memory'
  }
}

// just add this line code make global.d.ts works
export {}