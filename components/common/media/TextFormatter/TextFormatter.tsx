import { Fragment } from 'react';
import { Link } from '@material-ui/core';

import { EXTERNAL_LINK_PROPS } from 'lib/constants';
import { breakLines, mapLinkElements } from 'util/text';

type Props = {
  /** Additionally convert URLs and email addresses to hyperlinks */
  autoLink?: boolean;
};

/**
 * Renders text content while respecting line breaks. Meant to be used to
 * enhance user-provided text content without giving full Markdown support.
 */
export const TextFormatter: React.FC<Props> = ({ autoLink, children }) => {
  const textLines = children ? breakLines(children.toString()) : [];

  return (
    <>
      {textLines.map((text, index) => (
        <Fragment key={index}>
          {autoLink
            ? mapLinkElements(text, (token, index) => (
                <Link href={token.href} {...EXTERNAL_LINK_PROPS} key={index}>
                  {token.text}
                </Link>
              ))
            : text}
          {index < textLines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
};
