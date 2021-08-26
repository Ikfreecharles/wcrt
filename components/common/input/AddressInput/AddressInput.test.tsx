import { useForm, UseFormReturn } from 'react-hook-form';

import {
  renderBeforeEach,
  screen,
  userEvent,
  act,
  apollo,
  graphqlResponse,
} from 'testing/util';

import { AddressInput } from './AddressInput';

describe('<AddressInput />', () => {
  let form: UseFormReturn;

  beforeAll(() => {
    apollo.response = { ...graphqlResponse.addresses };
  });

  const FormComponent: React.FC = () => {
    form = useForm();

    return (
      <AddressInput
        name="test"
        label="Sample label"
        helperText="Sample text"
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

  it('should render a checkbox for each address', () => {
    ['Sample location', 'Some address', 'Random city'].forEach((address) => {
      expect(
        screen.getByRole('checkbox', { name: address })
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
      userEvent.click(
        screen.getByRole('checkbox', { name: 'Sample location' })
      );
    });
    expect(form.getValues()).toEqual({ test: ['T:123:Address'] });
  });
});
