import { renderBeforeEach, screen } from 'testing/util';

import { Markdown } from './Markdown';

const sampleMarkdown = `
# Heading 1

## Heading 2

### Heading 3

Paragraph text

*Emphasized text*

**Strong text**

[Manual link](http://example.com)

http://example.com/auto

[@youtube](8_EQfE-JOUI)

<div data-testid="custom-html">Custom HTML</div>
`;

describe('<Markdown />', () => {
  renderBeforeEach(<Markdown>{sampleMarkdown}</Markdown>);

  it('should render markdown elements', () => {
    expect(screen.getByText('Heading 1').tagName).toBe('H2');
    expect(screen.getByText('Heading 2').tagName).toBe('H3');
    expect(screen.getByText('Heading 3').tagName).toBe('H4');
    expect(screen.getByText('Paragraph text').tagName).toBe('P');
    expect(screen.getByText('Emphasized text').tagName).toBe('EM');
    expect(screen.getByText('Strong text').tagName).toBe('STRONG');
    expect(screen.getByText('Manual link').tagName).toBe('A');
    expect(screen.getByText('http://example.com/auto').tagName).toBe('A');
  });

  it('should render embedded media', () => {
    expect(screen.getByTestId('media')).toBeInTheDocument();
  });

  it('should not render custom HTML', () => {
    expect(screen.queryByTestId('custom-html')).not.toBeInTheDocument();
    expect(screen.queryByText('Custom HTML')).not.toBeInTheDocument();
  });
});
