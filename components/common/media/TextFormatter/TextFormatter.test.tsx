import { renderBeforeEach, screen } from 'testing/util';

import { TextFormatter } from './TextFormatter';

const sampleText = `First paragraph
with a second line

[Manual link](http://example.com) with some **additional** text
http://example.com/auto

# Sample heading

<div data-testid="custom-html">Custom HTML</div>`;

describe('<TextFormatter />', () => {
  describe('default', () => {
    renderBeforeEach(<TextFormatter>{sampleText}</TextFormatter>);

    it('should render line breaks', () => {
      expect(document.querySelectorAll('br')).toHaveLength(8);
    });

    it('should render its raw text contents', () => {
      expect(document.body).toContainHTML('First paragraph');
      expect(document.body).toContainHTML('with a second line');
      expect(document.body).toContainHTML(
        '[Manual link](http://example.com) with some **additional** text'
      );
      expect(document.body).toContainHTML('http://example.com/auto');
      expect(document.body).toContainHTML('# Sample heading');
    });

    it('should escape custom HTML', () => {
      expect(document.body).toContainHTML(
        '&lt;div data-testid="custom-html"&gt;Custom HTML&lt;/div&gt;'
      );
    });
  });

  describe('with link support', () => {
    renderBeforeEach(<TextFormatter autoLink>{sampleText}</TextFormatter>);

    it('should render a manual link', () => {
      expect(
        screen.getByRole('link', {
          name: 'Manual link',
        })
      ).toBeInTheDocument();
    });

    it('should render an auto link', () => {
      expect(
        screen.getByRole('link', {
          name: 'http://example.com/auto',
        })
      ).toBeInTheDocument();
    });

    it('should render its other text contents without additional formatting', () => {
      expect(document.body).toContainHTML('First paragraph');
      expect(document.body).toContainHTML('with a second line');
      expect(document.body).toContainHTML('with some **additional** text');
      expect(document.body).toContainHTML('# Sample heading');
    });

    it('should escape custom HTML', () => {
      expect(document.body).toContainHTML(
        '&lt;div data-testid="custom-html"&gt;Custom HTML&lt;/div&gt;'
      );
    });
  });
});
