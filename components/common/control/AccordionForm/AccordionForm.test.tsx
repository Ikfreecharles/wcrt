import {
  enqueueSnackbar,
  formStatus,
  renderBeforeEach,
  screen,
  userEvent,
} from 'testing/util';

import { AccordionForm } from './AccordionForm';

jest.mock('hooks/form');

describe('<AccordionForm />', () => {
  const toggle = jest.fn();

  describe('collapsed', () => {
    renderBeforeEach(
      <AccordionForm
        title="Sample title"
        preview="Sample preview"
        Form={() => <form id="form-123" aria-label="Sample form" />}
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

    it('should render an edit button', () => {
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    });

    it('should be considered collapsed', () => {
      expect(screen.getByRole('button', { name: 'Edit' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('should expand the accordion on edit button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Edit' }));
      expect(toggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('expanded', () => {
    renderBeforeEach(
      <AccordionForm
        title="Sample title"
        preview="Sample preview"
        Form={() => <form id="form-123" aria-label="Sample form" />}
        expanded={true}
        toggle={toggle}
      />
    );

    it('should be considered expanded', () => {
      expect(screen.getByRole('button', { name: 'Edit' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('should not render the preview text', () => {
      expect(screen.queryByText('Sample preview')).not.toBeInTheDocument();
    });

    it('should render the form', () => {
      expect(
        screen.getByRole('form', { name: 'Sample form' })
      ).toBeInTheDocument();
    });

    it('should render a save button', () => {
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('should render a cancel button', () => {
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
    });

    it('should collapse the accordion on edit button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Edit' }));
      expect(toggle).toHaveBeenCalledTimes(1);
    });

    it('should collapse the accordion on cancel button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(toggle).toHaveBeenCalledTimes(1);
    });

    describe('completed form', () => {
      beforeAll(() => {
        formStatus.formStatus = 'completed';
      });

      it('should trigger a notification', () => {
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledWith('Changes saved.');
      });

      it('should collapse the accordion', () => {
        expect(toggle).toHaveBeenCalledTimes(1);
      });
    });
  });
});
