// Declare importing SVG files as URLs
declare module '*.svg?url' {
    const content: string;
    export default content;
  }
  
  // Declare importing SVG files as React components
  declare module '*.svg' {
    import React from 'react';
    const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default content;
  }