import { useForm, UseFormReturn } from 'react-hook-form';

import { renderBeforeEach, screen, userEvent, act } from 'testing/util';

import { BooleanInput } from './BooleanInput';

describe('<BooleanInput />', () => {
  let form: UseFormReturn;

  describe('basic', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <BooleanInput
          name="test"
          label="Sample label"
          helperText="Sample text"
          use={form}
        />
      );
    };

    renderBeforeEach(<FormComponent />);

    it('should render a checkbox', () => {
      expect(
        screen.getByRole('checkbox', { name: 'Sample label' })
      ).toBeInTheDocument();
    });

    it('should render the helper text', () => {
      expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    it('should set its default value initially', () => {
      expect(form.getValues()).toEqual({ test: false });
    });

    it('should update its value on activation', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'Sample label' }));
      });
      expect(form.getValues()).toEqual({ test: true });
    });
  });

  describe('with validation', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <BooleanInput
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
        screen.getByRole('checkbox', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'false');
    });

    it('should be invalidated initially', async () => {
      await act(async () => {
        form.trigger();
      });
      expect(
        screen.getByRole('checkbox', { name: 'Sample label' })
      ).toHaveAttribute('aria-invalid', 'true');
    });

    it('should be validated after activation', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'Sample label' }));
      });
      await act(async () => {
        form.trigger();
      });
      expect(
        screen.getByRole('checkbox', { name: 'Sample label' })
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
