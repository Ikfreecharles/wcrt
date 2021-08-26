import { renderBeforeEach, screen } from 'testing/util';

import { AccordionDisplay } from './AccordionDisplay';

describe('<AccordionDisplay />', () => {
  renderBeforeEach(
    <AccordionDisplay title="Sample title" preview="Sample preview" />
  );

  it('should render the title as heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Sample title' })
    ).toBeInTheDocument();
  });

  it('should render the preview text', () => {
    expect(screen.getByText('Sample preview')).toBeInTheDocument();
  });

  it('should render an disabled button', () => {
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });
});
