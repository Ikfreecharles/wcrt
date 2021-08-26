import {
  act,
  fireEvent,
  renderBeforeEach,
  screen,
  userEvent,
} from 'testing/util';
import { FormSection } from 'components/common/form';
import { BooleanInput, TextInput } from 'components/common/input';

import { FormWrapper } from './FormWrapper';

const setStatus = jest.fn();
const onSubmit = jest.fn();

describe('<FormWrapper />', () => {
  describe('default', () => {
    renderBeforeEach(
      <FormWrapper
        title="Sample form"
        mode="onSubmit"
        setStatus={setStatus}
        onSubmit={onSubmit}
        id="form-123"
      >
        <TextInput name="test" label="Sample input" />
      </FormWrapper>
    );

    it('should render a form', () => {
      expect(
        screen.getByRole('form', { name: 'Sample form' })
      ).toBeInTheDocument();
    });

    it('should render its form elements', () => {
      expect(
        screen.getByRole('textbox', { name: 'Sample input' })
      ).toBeInTheDocument();
    });

    it('should update its status after typing', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Sample input' }),
        'Some text',
        { delay: 1 }
      );
      expect(setStatus).toHaveBeenLastCalledWith('valid');
    });

    it('should call the submit handler on submit', async () => {
      await act(async () => {
        fireEvent.submit(screen.getByRole('form', { name: 'Sample form' }));
      });
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({ test: '' });
    });
  });

  describe('with default values', () => {
    renderBeforeEach(
      <FormWrapper
        title="Sample form"
        mode="onSubmit"
        defaultValues={{ test: 'Sample text' }}
        setStatus={setStatus}
        onSubmit={onSubmit}
        id="form-123"
      >
        <TextInput name="test" label="Sample input" />
      </FormWrapper>
    );

    it('should prefill its form elements with default values', () => {
      expect(screen.getByRole('textbox', { name: 'Sample input' })).toHaveValue(
        'Sample text'
      );
    });
  });

  describe('with conditional sections', () => {
    renderBeforeEach(
      <FormWrapper
        title="Sample form"
        mode="onSubmit"
        setStatus={setStatus}
        onSubmit={onSubmit}
        id="form-123"
      >
        <BooleanInput name="test-one" label="First input" />

        <FormSection when="test-one">
          <TextInput name="test-two" label="Second input" />
        </FormSection>
      </FormWrapper>
    );

    it('should render the first input', () => {
      expect(
        screen.getByRole('checkbox', { name: 'First input' })
      ).toBeInTheDocument();
    });

    it('should not render the second input initially', () => {
      expect(
        screen.queryByRole('textbox', { name: 'Second input' })
      ).not.toBeInTheDocument();
    });

    it('should render the second input on activation', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'First input' }));
      });
      expect(
        screen.getByRole('textbox', { name: 'Second input' })
      ).toBeInTheDocument();
    });
  });
});
