import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { ConfirmationDialog } from './ConfirmationDialog';

describe('<ConfirmationDialog />', () => {
  const setOpen = jest.fn();
  const onConfirm = jest.fn();

  renderBeforeEach(
    <ConfirmationDialog
      text="Sample text"
      onConfirm={onConfirm}
      open
      setOpen={setOpen}
    />
  );

  it('should render a dialog', () => {
    expect(
      screen.getByRole('dialog', { name: 'Confirmation' })
    ).toBeInTheDocument();
  });

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Are you sure?' })
    ).toBeInTheDocument();
  });

  it('should render a confirm button', () => {
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('should execute the action on confirm button click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should close the dialog on cancel button click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
