import { render, screen } from 'testing/util';

import { FormSection } from './FormSection';

describe('<FormSection />', () => {
  describe('enabled', () => {
    it('should render its content when active', () => {
      render(
        <FormSection page={1} current={1}>
          Sample content
        </FormSection>
      );
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });

    it('should not render its content when inactive', () => {
      render(
        <FormSection page={1} current={0}>
          Sample content
        </FormSection>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('should always render its content', () => {
      render(<FormSection page={1}>Sample content</FormSection>);
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });
  });
});
