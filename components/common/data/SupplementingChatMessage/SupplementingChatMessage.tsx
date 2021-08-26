import { ChatMessageFragment, useAccountSignatureQuery } from 'lib/graphql';
import { ChatMessage } from 'components/common/misc';

type Props = {
  /** Raw messaging data */
  data: ChatMessageFragment;
};

/** Wraps a chat message and supplement its author informations. */
export const SupplementingChatMessage: React.FC<Props> = ({ data }) => {
  const { loading: authorLoading, data: authorData } = useAccountSignatureQuery(
    {
      skip: !data.authorId,
      variables: { account: data.authorId! },
    }
  );

  const authorProfile =
    authorData?.account?.__typename === 'OnlineAccount'
      ? authorData.account.represents
      : undefined;

  return (
    <ChatMessage
      data={data}
      author={{ loading: authorLoading && !authorData, data: authorProfile }}
    />
  );
};
