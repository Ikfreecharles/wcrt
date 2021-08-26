import { Lexer, Token, Tokens } from 'marked';
import truncate from 'lodash/truncate';

import { hasProperty } from 'util/type';

/** Truncates a text to the given length. */
export const excerpt = (input: string, length = 320) =>
  truncate(input, {
    length,
    separator: ' ',
    omission: ' …',
  }).replace(/[ ,.!?]* …$/g, ' …');

/** Converts a string to an array of text lines (e.g. to add line breaks). */
export const breakLines = (input: string) =>
  input.split(/(?:\r\n|\r|\n)/).map((value) => value.trim());

/** Our shared Markdown options. */
const markdownOptions = { gfm: true, mangle: false };

/** Converts a string to a list of Markdown block tokens. */
const getMarkdownTokens = (input: string) => Lexer.lex(input, markdownOptions);

/** Converts a string to a list of Markdown inline tokens. */
const getInlineTokens = (input: string) =>
  Lexer.lexInline(input, markdownOptions);

/** Shortcut for converting a string and mapping a render function for each token. */
export const mapMarkdownElements = (
  markdownInput: string,
  renderElement: (token: Token, index: number) => React.ReactNode
) => getMarkdownTokens(markdownInput).map(renderElement);

/** Shortcut for converting a string and mapping a render function for link tokens only. */
export const mapLinkElements = (
  inlineMarkdownInput: string,
  renderElement: (token: Tokens.Link, index: number) => React.ReactNode
) =>
  getInlineTokens(inlineMarkdownInput).map((token, index) => {
    if (hasProperty(token, 'type') && token.type === 'link')
      return renderElement(token, index);
    return token.raw;
  });
