import { useForm, UseFormReturn } from 'react-hook-form';

import {
  renderBeforeEach,
  screen,
  userEvent,
  act,
  auth,
  submit,
} from 'testing/util';

import { AvatarInput } from './AvatarInput';

jest.mock('util/validation');
jest.mock('hooks/upload');

describe('<AvatarInput />', () => {
  const sampleFile = new File(['sample'], 'sample.png', { type: 'image/png' });
  let form: UseFormReturn;

  beforeAll(() => {
    auth.session = auth.getActiveSession();
  });

  describe('basic', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <AvatarInput
          name="test"
          label="Sample label"
          helperText="Sample text"
          use={form}
        />
      );
    };

    renderBeforeEach(<FormComponent />);

    it('should render an upload preview', () => {
      expect(
        screen.getByRole('button', { name: 'Sample label' })
      ).toBeInTheDocument();
    });

    it('should render an upload button', () => {
      expect(
        screen.getByRole('button', { name: 'Upload image' })
      ).toBeInTheDocument();
    });

    it('should render a disabled delete button', () => {
      expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    });

    it('should render the helper text', () => {
      expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    it('should create an image on upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), sampleFile);
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('image', sampleFile);
    });

    it('should render a preview on upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), sampleFile);
      });
      expect(
        screen.getByRole('img', { name: 'Uploaded image' })
      ).toBeInTheDocument();
    });

    it('should enable the delete button on upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), sampleFile);
      });
      expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled();
    });

    it('should update its value on upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), sampleFile);
      });
      expect(form.getValues()).toEqual({
        test: {
          id: expect.anything(),
          resourceLocation: expect.anything(),
        },
      });
    });

    it('should update its value on delete button click', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), sampleFile);
      });
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: 'Delete' }));
      });
      expect(form.getValues()).toEqual({
        test: null,
      });
    });
  });

  describe('with validation', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <AvatarInput
          name="test"
          rules={{ required: true }}
          label="Sample label"
          helperText="Sample text"
          use={form}
        />
      );
    };

    renderBeforeEach(<FormComponent />);

    it('should render as valid initially', () => {
      expect(
        screen.getByRole('button', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'false');
    });

    it('should be invalidated initially', async () => {
      await act(async () => {
        form.trigger();
      });
      expect(
        screen.getByRole('button', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'true');
    });

    it('should be validated after upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), sampleFile);
      });
      await act(async () => {
        form.trigger();
      });
      expect(
        screen.getByRole('button', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'false');
    });

    describe('with external error', () => {
      beforeEach(async () => {
        await act(async () => {
          form.setError('test', { message: 'Sample error' });
        });
      });

      it('should not render the initial helper text', () => {
        expect(screen.queryByText('Sample text')).not.toBeInTheDocument();
      });

      it('should render the error message as helper text', () => {
        expect(screen.getByText('Sample error')).toBeInTheDocument();
      });
    });
  });
});
