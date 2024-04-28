import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'page-anchor': PersonInfoProps;
      'fullscreen-loading': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface PersonInfoProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  href: string,
  class?: string
}

// just add this line code make global.d.ts works
export {}