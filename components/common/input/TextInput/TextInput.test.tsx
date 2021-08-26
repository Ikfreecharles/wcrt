import { useForm, UseFormReturn } from 'react-hook-form';

import { renderBeforeEach, screen, userEvent, act } from 'testing/util';

import { TextInput } from './TextInput';

describe('<TextInput />', () => {
  let form: UseFormReturn;

  describe('basic', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <TextInput
          name="test"
          label="Sample label"
          helperText="Sample text"
          use={form}
        />
      );
    };

    renderBeforeEach(<FormComponent />);

    it('should render a text field', () => {
      expect(
        screen.getByRole('textbox', { name: 'Sample label' })
      ).toBeInTheDocument();
    });

    it('should render the helper text', () => {
      expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    it('should set its default value initially', () => {
      expect(form.getValues()).toEqual({ test: '' });
    });

    it('should update its value on typing', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Sample label' }),
        'Some text',
        { delay: 1 }
      );
      expect(form.getValues()).toEqual({ test: 'Some text' });
    });
  });

  describe('with validation', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <TextInput
          name="test"
          rules={{ required: true, maxLength: 160 }}
          label="Sample label"
          helperText="Sample text"
          use={form}
        />
      );
    };

    renderBeforeEach(<FormComponent />);

    it('should render as valid initially', () => {
      expect(
        screen.getByRole('textbox', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'false');
    });

    it('should be invalidated initially', async () => {
      await act(async () => {
        form.trigger();
      });
      expect(
        screen.getByRole('textbox', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'true');
    });

    it('should render remaining text length after typing', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Sample label' }),
        'Some text',
        { delay: 1 }
      );
      expect(screen.getByText('9/160')).toBeInTheDocument();
    });

    it('should be validated after typing', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Sample label' }),
        'Some text',
        { delay: 1 }
      );
      await act(async () => {
        form.trigger();
      });
      expect(
        screen.getByRole('textbox', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'false');
    });

    it('should be invalidated after exceeding maximum length', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Sample label' }),
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        { delay: 1 }
      );
      await act(async () => {
        form.trigger();
      });
      expect(
        screen.getByRole('textbox', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'true');
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
