import { Button } from '@material-ui/core';

import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { Dialog } from './Dialog';

describe('<Dialog />', () => {
  const setOpen = jest.fn();

  describe('default', () => {
    renderBeforeEach(<Dialog title="Sample title" open setOpen={setOpen} />);

    it('should render its title as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Sample title' })
      ).toBeInTheDocument();
    });

    it('should render a close button', () => {
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('should be closed on click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(setOpen).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('with actions', () => {
    renderBeforeEach(
      <Dialog
        title="Sample title"
        open
        setOpen={setOpen}
        actions={<Button>Sample button</Button>}
      />
    );

    it('should render an action button', () => {
      expect(
        screen.getByRole('button', { name: 'Sample button' })
      ).toBeInTheDocument();
    });
  });

  describe('with form navigation', () => {
    const setPage = jest.fn();

    describe('default', () => {
      renderBeforeEach(
        <Dialog
          title="Sample title"
          open
          setOpen={setOpen}
          actions={{ formId: 'sample-form', page: 1, setPage }}
        />
      );

      it('should render a next button', () => {
        expect(
          screen.getByRole('button', { name: 'Next' })
        ).toBeInTheDocument();
      });

      it('should render a previous button', () => {
        expect(
          screen.getByRole('button', { name: 'Previous' })
        ).toBeInTheDocument();
      });

      it('should navigate to the previous page on previous button click', () => {
        userEvent.click(screen.getByRole('button', { name: 'Previous' }));
        expect(setPage).toHaveBeenCalledTimes(1);
        expect(setPage).toHaveBeenCalledWith(0);
      });
    });

    describe('intro page', () => {
      renderBeforeEach(
        <Dialog
          title="Sample title"
          open
          setOpen={setOpen}
          actions={{ formId: 'sample-form', page: 0, setPage }}
        />
      );

      it('should render a start button', () => {
        expect(
          screen.getByRole('button', { name: 'Start' })
        ).toBeInTheDocument();
      });

      it('should render a cancel button', () => {
        expect(
          screen.getByRole('button', { name: 'Cancel' })
        ).toBeInTheDocument();
      });
    });

    describe('custom labels', () => {
      renderBeforeEach(
        <Dialog
          title="Sample title"
          open
          setOpen={setOpen}
          actions={{
            formId: 'sample-form',
            page: 1,
            setPage,
            nextButtonLabel: 'Custom next',
            previousButtonLabel: 'Custom previous',
          }}
        />
      );

      it('should render a custom next button', () => {
        expect(
          screen.getByRole('button', { name: 'Custom next' })
        ).toBeInTheDocument();
      });

      it('should render a custom previous button', () => {
        expect(
          screen.getByRole('button', { name: 'Custom previous' })
        ).toBeInTheDocument();
      });
    });
  });
});
