import { useForm, UseFormReturn } from 'react-hook-form';

import {
  renderBeforeEach,
  screen,
  userEvent,
  act,
  apollo,
  graphqlResponse,
} from 'testing/util';

import { CategoryInput } from './CategoryInput';

describe('<CategoryInput />', () => {
  let form: UseFormReturn;

  beforeAll(() => {
    apollo.response = { ...graphqlResponse.categories };
  });

  const FormComponent: React.FC = () => {
    form = useForm();

    return (
      <CategoryInput
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

  it('should render a checkbox for each category', () => {
    ['Culture', 'Administration', 'Environment'].forEach((category) => {
      expect(
        screen.getByRole('checkbox', { name: category })
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
      userEvent.click(screen.getByRole('checkbox', { name: 'Culture' }));
    });
    expect(form.getValues()).toEqual({ test: ['T:123:Category'] });
  });
});
