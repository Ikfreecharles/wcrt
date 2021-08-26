import { Fragment, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, Grid, Typography } from '@material-ui/core';
import { BiMessage } from 'react-icons/bi';
import dayjs from 'dayjs';

import { useTranslation } from 'lib/i18n';
import { useChatChannelQuery } from 'lib/graphql';
import { useMessaging } from 'hooks/messaging';
import { IconDisplay, ChatDivider, ChatMessage } from 'components/common/misc';
import { SupplementingChatMessage } from 'components/common/data';

type Props = {
  /** The chat channel used as data source */
  channelId: string;
};

/**
 * Fetches chat data and displays it as a message stream. Includes a
 * scroll-based pagination.
 */
export const Chat: React.FC<Props> = ({ channelId }) => {
  const { t } = useTranslation();
  const { data } = useChatChannelQuery({
    variables: { id: channelId },
  });
  const { loadMessages, markMessagesAsRead, clearMessages } =
    useMessaging(channelId);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>();
  const [scrollState, setScrollState] =
    useState<{ height: number; position: number }>();
  const containerEl = useRef<HTMLDivElement>(null);
  const [loadingIndicatorEl, loadingIndicatorInView] = useInView();
  const [lastMessageEl, lastMessageInView] = useInView({
    initialInView: true,
  });

  // Initially load existing messages and update the loading state.
  useEffect(() => {
    (async () => {
      const initialCursor = await loadMessages();

      setCursor(initialCursor);
      setLoading(false);
    })();

    // Remove existing messages from cache when unmounting.
    return () => clearMessages();
  }, []);

  // Load more messages as the loading indicator becomes visible.
  useEffect(() => {
    if (loadingIndicatorInView && cursor && !loading)
      (async () => {
        setLoading(true);

        const newCursor = await loadMessages(cursor);

        setCursor(newCursor);
        setLoading(false);
      })();
  }, [loadingIndicatorInView]);

  // Mark new messages as read and maintain the current scroll position.
  useEffect(() => {
    markMessagesAsRead();

    if (containerEl.current) {
      if (lastMessageInView) {
        containerEl.current.scrollTop = containerEl.current.scrollHeight;
      } else if (scrollState) {
        containerEl.current.scrollTop =
          containerEl.current.scrollHeight -
          scrollState.height +
          scrollState.position;
      }
    }

    // Save current scroll state when unmounting.
    return () => {
      if (containerEl.current)
        setScrollState({
          height: containerEl.current.scrollHeight,
          position: containerEl.current.scrollTop,
        });
    };
  }, [data]);

  return (
    <Box height="100%" overflow="auto" p={2} {...{ ref: containerEl }}>
      <Grid container spacing={3} role="log">
        {(loading || cursor) && (
          <>
            {[0, 1, 2, 3].map((item) => (
              <Grid
                item
                xs={12}
                key={item}
                ref={item === 3 ? loadingIndicatorEl : undefined}
              >
                <Box
                  style={{
                    opacity: data?.chatChannel?.messages?.length
                      ? 0.25 + item * 0.25
                      : 1 - item * 0.25,
                  }}
                >
                  <ChatMessage />
                </Box>
              </Grid>
            ))}
          </>
        )}

        {data?.chatChannel?.messages?.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 &&
              !dayjs(item.createdAt).isSame(
                data!.chatChannel!.messages![index - 1].createdAt,
                'day'
              ) && (
                <Grid item xs={12}>
                  <ChatDivider date={item.createdAt} />
                </Grid>
              )}

            {data!.chatChannel!.messages!.length - index ===
              data!.chatChannel!.newCount && (
              <Grid item xs={12}>
                <ChatDivider />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              ref={
                index === data!.chatChannel!.messages!.length - 1
                  ? lastMessageEl
                  : undefined
              }
            >
              <SupplementingChatMessage data={item} />
            </Grid>
          </Fragment>
        ))}
      </Grid>

      {!loading && !data?.chatChannel?.messages?.length && (
        <Box
          width="100%"
          minHeight="100%"
          textAlign="center"
          p={4}
          color="text.disabled"
        >
          <IconDisplay icon={BiMessage} />
          <Box p={1}>
            <Typography>{t('empty.chat')}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
