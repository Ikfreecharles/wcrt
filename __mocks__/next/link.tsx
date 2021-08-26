import { cloneElement, Children, isValidElement } from 'react';
import { LinkProps } from 'next/dist/client/link';

const Link: React.FC<LinkProps> = ({ children, passHref, href }) =>
  passHref && isValidElement(children) ? (
    cloneElement(Children.only(children), { href })
  ) : (
    <>{children}</>
  );

export default Link;
