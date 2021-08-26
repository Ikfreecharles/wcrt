import { renderBeforeEach, screen, apollo } from 'testing/util';
import { onlineAccount, chatMessage } from 'testing/data';

import { SupplementingChatMessage } from './SupplementingChatMessage';

describe('<SupplementingChatMessage />', () => {
  beforeAll(() => {
    apollo.response = {
      account: onlineAccount,
    };
  });

  renderBeforeEach(<SupplementingChatMessage data={chatMessage} />);

  it('should render its author name', () => {
    expect(
      screen.getByText(onlineAccount.represents!.name)
    ).toBeInTheDocument();
  });

  it('should render its text', () => {
    expect(screen.getByText(chatMessage.content!)).toBeInTheDocument();
  });
});
