import { enqueueSnackbar, closeSnackbar } from 'testing/util';

export const useSnackbar = () => ({
  enqueueSnackbar,
  closeSnackbar,
});

export const SnackbarProvider: React.FC = ({ children }) => (
  <div data-testid="notistack-provider">{children}</div>
);
