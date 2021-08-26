import { renderBeforeEach, screen } from 'testing/util';

import { SnackbarProvider } from './SnackbarProvider';

describe('<SnackbarProvider />', () => {
  renderBeforeEach(<SnackbarProvider />);

  it('should be forwarded to the vendor provider', () => {
    expect(screen.getByTestId('notistack-provider')).toBeInTheDocument();
  });
});
