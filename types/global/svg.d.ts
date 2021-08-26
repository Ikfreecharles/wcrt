/** Supply a global type to use for raw SVG imports. */
declare global {
  module '*.svg' {
    const content: React.FC<React.SVGAttributes<SVGElement>>;
    export default content;
  }
}

export {};
