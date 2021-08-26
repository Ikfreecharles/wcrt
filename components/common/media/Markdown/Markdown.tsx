import { Box, Typography, Link, makeStyles } from '@material-ui/core';
import { Token, Tokens } from 'marked';
import unescape from 'lodash/unescape';

import { EXTERNAL_LINK_PROPS } from 'lib/constants';
import { hasProperty } from 'util/type';
import { ExternalMedia } from 'components/common/media';
import { mapMarkdownElements } from 'util/text';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    marginBottom: spacing(-2),
  },
  gutterBottom: {
    marginBottom: spacing(2),
  },
  list: {
    padding: 0,
    listStylePosition: 'inside',
  },
  italic: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 600,
  },
}));

/**
 * Renders its children as Markdown interpreted elements. As we do not want to
 * support the whole Markdown spec, we are only converting certain tokens. Meant
 * to be used to enhance user-provided text content.
 */
export const Markdown: React.FC = ({ children }) => {
  const classes = useStyles();

  // Add some custom Markdown interpretions.
  const renderCustomElement = (element: Tokens.Paragraph, key: number) => {
    if (
      hasProperty(element, 'tokens') &&
      Array.isArray(element.tokens) &&
      hasProperty(element.tokens[0], 'text') &&
      hasProperty(element.tokens[0], 'href')
    ) {
      const type = element.tokens[0].text.replace('@', '');
      const value = element.tokens[0].href;

      switch (type) {
        case 'youtube':
          return (
            <ExternalMedia
              link={`https://www.youtube-nocookie.com/embed/${value}`}
              aspectRatio={16 / 9}
              className={classes.gutterBottom}
              key={key}
            />
          );
      }
    }

    return null;
  };

  // Map the detected tokens to custom JSX.
  const renderElement = (element: Token, index: number): React.ReactNode => {
    if (hasProperty(element, 'type')) {
      switch (element.type) {
        case 'heading':
          return (
            <Typography
              component={`h${element.depth + 1}` as 'h2' | 'h3' | 'h4'}
              variant={`h${element.depth + 3}` as 'h4' | 'h5' | 'h6'}
              gutterBottom
              key={index}
            >
              {renderNestedElements(element) || unescape(element.text)}
            </Typography>
          );
        case 'paragraph':
          return element.raw.startsWith('[@') ? (
            renderCustomElement(element, index)
          ) : (
            <Typography component="p" variant="body2" paragraph key={index}>
              {renderNestedElements(element) || unescape(element.text)}
            </Typography>
          );
        case 'list':
          return (
            <Typography
              component={element.ordered ? 'ol' : 'ul'}
              variant="body2"
              paragraph
              className={classes.list}
              key={index}
            >
              {renderListItems(element)}
            </Typography>
          );
        case 'list_item':
          return (
            <li key={index}>
              {renderNestedElements(element) || unescape(element.text)}
            </li>
          );
        case 'em':
          return (
            <em className={classes.italic} key={index}>
              {renderNestedElements(element) || unescape(element.text)}
            </em>
          );
        case 'strong':
          return (
            <strong className={classes.bold} key={index}>
              {renderNestedElements(element) || unescape(element.text)}
            </strong>
          );
        case 'link':
          return (
            <Link href={element.href} {...EXTERNAL_LINK_PROPS} key={index}>
              {renderNestedElements(element) || unescape(element.text)}
            </Link>
          );
        case 'br':
          return <br key={index} />;
        case 'text':
        case 'escape':
          return renderNestedElements(element) || unescape(element.text);
      }
    }

    return null;
  };

  // Continue the iteration if child tokens are available.
  const renderNestedElements = (element: Token): React.ReactNode =>
    hasProperty(element, 'tokens') && Array.isArray(element.tokens)
      ? element.tokens.map(renderElement)
      : null;

  // Continue the iteration if child items are available.
  const renderListItems = (element: Token): React.ReactNode =>
    hasProperty(element, 'items') && Array.isArray(element.items)
      ? element.items.map(renderElement)
      : null;

  return (
    <Box className={classes.root} data-testid="markdown">
      {children && mapMarkdownElements(children.toString(), renderElement)}
    </Box>
  );
};
