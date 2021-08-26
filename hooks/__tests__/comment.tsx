import { renderHook, TestingContext, auth, apollo } from 'testing/util';
import { CommentCreateDocument } from 'lib/graphql';
import { useCommentSubmit } from 'hooks/comment';

jest.mock('hooks/profile');

describe('useCommentSubmit', () => {
  beforeAll(() => {
    auth.session = auth.getActiveSession();
    apollo.response = {
      commentCreate: {
        __typename: 'Comment',
        id: 'T:123:Comment',
      },
    };
  });

  test('create new comment', async () => {
    const { result } = renderHook(() => useCommentSubmit(), {
      wrapper: TestingContext,
    });
    const newId = await result.current('T:123:Article', {
      text: 'Sample comment',
    });
    expect(newId).toBe('T:123:Comment');
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(CommentCreateDocument, {
      text: 'Sample comment',
      agent: 'T:123:Person',
      content: 'T:123:Article',
    });
  });
});
