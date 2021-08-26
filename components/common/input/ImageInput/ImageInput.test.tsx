import { useForm, UseFormReturn } from 'react-hook-form';

import {
  renderBeforeEach,
  screen,
  userEvent,
  act,
  submit,
  enqueueSnackbar,
} from 'testing/util';

import { ImageInput } from './ImageInput';

jest.mock('util/validation');
jest.mock('hooks/upload');

describe('<ImageInput />', () => {
  let form: UseFormReturn;

  const getSampleFile = () =>
    new File(['sample'], 'sample.png', { type: 'image/png' });

  describe('basic', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <ImageInput
          name="test"
          label="Sample label"
          helperText="Sample text"
          use={form}
        />
      );
    };

    renderBeforeEach(<FormComponent />);

    it('should render an upload button', () => {
      expect(
        screen.getByRole('button', { name: 'Sample label' })
      ).toBeInTheDocument();
    });

    it('should render the helper text', () => {
      expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    it('should create an image on upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('image', expect.any(File));
    });

    it('should render a preview on upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      expect(
        screen.getByRole('img', { name: 'Uploaded image' })
      ).toBeInTheDocument();
    });

    it('should render a delete button on upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      expect(
        screen.getByRole('button', { name: 'Delete' })
      ).toBeInTheDocument();
    });

    it('should update its value on upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      expect(form.getValues()).toEqual({
        test: [
          {
            id: expect.anything(),
            resourceLocation: expect.anything(),
          },
        ],
      });
    });

    it('should update its value on delete button click', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: 'Delete' }));
      });
      expect(form.getValues()).toEqual({
        test: [],
      });
    });

    it('should render multiple previews on repeated upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      expect(
        screen.getAllByRole('img', { name: 'Uploaded image' })
      ).toHaveLength(2);
    });

    it('should concat its value on repeated upload', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      expect(form.getValues()).toEqual({
        test: [
          {
            id: expect.anything(),
            resourceLocation: expect.anything(),
          },
          {
            id: expect.anything(),
            resourceLocation: expect.anything(),
          },
        ],
      });
    });
  });

  describe('with validation', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <ImageInput
          name="test"
          rules={{ required: true, maxLength: 2 }}
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
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      await act(async () => {
        form.trigger();
      });
      expect(
        screen.getByRole('button', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'false');
    });

    it('should trigger a notification on exceeding maximum length', async () => {
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      await act(async () => {
        userEvent.upload(screen.getByTestId('file-input'), getSampleFile());
      });
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Too many files.', {
        variant: 'error',
      });
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
