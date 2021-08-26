import { useForm, UseFormReturn } from 'react-hook-form';

import { renderBeforeEach, screen, userEvent, act } from 'testing/util';

import { OptionInput } from './OptionInput';

describe('<OptionInput />', () => {
  const options = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
  let form: UseFormReturn;

  describe('basic', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <OptionInput
          name="test"
          label="Sample label"
          helperText="Sample text"
          listProps={{ options }}
          use={form}
        />
      );
    };

    renderBeforeEach(<FormComponent />);

    it('should render a labeled form group', () => {
      expect(
        screen.getByRole('group', { name: 'Sample label' })
      ).toBeInTheDocument();
    });

    it('should render a checkbox for each option', () => {
      options.forEach((option) => {
        expect(
          screen.getByRole('checkbox', { name: option.name })
        ).toBeInTheDocument();
      });
    });

    it('should render the helper text', () => {
      expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    it('should set its default value initially', () => {
      expect(form.getValues()).toEqual({ test: [] });
    });

    it('should update its value on activation', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'a' }));
      });
      expect(form.getValues()).toEqual({ test: ['a'] });
    });
  });

  describe('with validation', () => {
    const FormComponent: React.FC = () => {
      form = useForm();

      return (
        <OptionInput
          name="test"
          rules={{ required: true, maxLength: 1 }}
          label="Sample label"
          helperText="Sample text"
          listProps={{
            options: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
          }}
          use={form}
        />
      );
    };

    renderBeforeEach(<FormComponent />);

    it('should render as valid initially', () => {
      options.forEach((option) => {
        expect(
          screen.getByRole('checkbox', { name: option.name })
        ).toHaveAttribute('aria-invalid', 'false');
      });
    });

    it('should be invalidated initially', async () => {
      await act(async () => {
        form.trigger();
      });
      options.forEach((option) => {
        expect(
          screen.getByRole('checkbox', { name: option.name })
        ).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should be validated after activation', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'a' }));
      });
      await act(async () => {
        form.trigger();
      });
      options.forEach((option) => {
        expect(
          screen.getByRole('checkbox', { name: option.name })
        ).toHaveAttribute('aria-invalid', 'false');
      });
    });

    it('should deactivate previous values on exceeding maximum length', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'a' }));
      });
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'b' }));
      });
      expect(form.getValues()).toEqual({ test: ['b'] });
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
