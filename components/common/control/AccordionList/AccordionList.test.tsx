import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { AccordionList } from './AccordionList';

describe('<AccordionList />', () => {
  const toggle = jest.fn();

  describe('collapsed', () => {
    renderBeforeEach(
      <AccordionList
        title="Sample title"
        preview="Sample preview"
        description="Sample description"
        List={() => <ul aria-label="Sample list" />}
        expanded={false}
        toggle={toggle}
      />
    );

    it('should render the title as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Sample title' })
      ).toBeInTheDocument();
    });

    it('should render the preview text', () => {
      expect(screen.getByText('Sample preview')).toBeInTheDocument();
    });

    it('should render an view button', () => {
      expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
    });

    it('should be considered collapsed', () => {
      expect(screen.getByRole('button', { name: 'View' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('should expand the accordion on view button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'View' }));
      expect(toggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('expanded', () => {
    renderBeforeEach(
      <AccordionList
        title="Sample title"
        preview="Sample preview"
        description="Sample description"
        List={() => <ul aria-label="Sample list" />}
        expanded={true}
        toggle={toggle}
      />
    );

    it('should be considered expanded', () => {
      expect(screen.getByRole('button', { name: 'View' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('should render the description', () => {
      expect(screen.getByText('Sample description')).toBeInTheDocument();
    });

    it('should render the list', () => {
      expect(
        screen.getByRole('list', { name: 'Sample list' })
      ).toBeInTheDocument();
    });

    it('should collapse the accordion on view button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'View' }));
      expect(toggle).toHaveBeenCalledTimes(1);
    });
  });
});
