import {
  renderBeforeEach,
  screen,
  userEvent,
  fireEvent,
  act,
  submit,
  apollo,
  graphqlResponse,
} from 'testing/util';

import { ProfileForm } from './ProfileForm';

jest.mock('hooks/profile');

describe('<ProfileForm />', () => {
  const setStatus = jest.fn();

  beforeAll(() => {
    apollo.response = {
      ...graphqlResponse.accountInfo,
      ...graphqlResponse.addresses,
    };
  });

  renderBeforeEach(
    <ProfileForm mode="onChange" setStatus={setStatus} id="form-123" />
  );

  it('should render a form', () => {
    expect(screen.getByRole('form', { name: 'Profile' })).toBeInTheDocument();
  });

  it('should render its form elements', () => {
    expect(screen.getByRole('button', { name: 'Avatar' })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Full name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Caption' })
    ).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Location' })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'About me' })
    ).toBeInTheDocument();
  });

  it('should render its default values', () => {
    expect(
      screen.getByRole('img', { name: 'Uploaded image' })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Full name' })).toHaveValue(
      'Sample user'
    );
    expect(screen.getByRole('textbox', { name: 'Caption' })).toHaveValue(
      'Lorem ipsum'
    );
    expect(
      screen.getByRole('checkbox', { name: 'Sample location' })
    ).toBeChecked();
    expect(screen.getByRole('textbox', { name: 'About me' })).toHaveValue(
      'Lorem ipsum dolor sit amet'
    );
  });

  it('should update the profile on submit', async () => {
    userEvent.clear(screen.getByRole('textbox', { name: 'Full name' }));
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Full name' }),
      'New name',
      { delay: 1 }
    );
    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: 'Profile' }));
    });
    expect(setStatus).toHaveBeenCalledWith('submitting');
    expect(setStatus).toHaveBeenCalledWith('completed');
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith('agent', {
      image: {
        id: 'T:123:Image',
        resourceLocation: 'https://source.unsplash.com/80x80/?portrait',
      },
      name: 'New name',
      info: 'Lorem ipsum',
      locations: ['T:123:Address'],
      intro: 'Lorem ipsum dolor sit amet',
    });
  });
});
