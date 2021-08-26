import { renderHook, TestingContext, auth, apollo } from 'testing/util';
import {
  CommentDeleteDocument,
  ImpulseDeleteDocument,
  ContentRatingDeleteDocument,
  CommentRatingDeleteDocument,
  MembershipDeleteDocument,
  GroupDeleteDocument,
  ArticleDeleteDocument,
  TaskDeleteDocument,
  MembershipInviteDeleteDocument,
  MembershipRequestDeleteDocument,
} from 'lib/graphql';
import { useEntityDelete } from 'hooks/entity';

jest.mock('hooks/profile');

describe('useEntityDelete', () => {
  describe('unauthenticated', () => {
    test('throw', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      expect(() => result.current('T:123:Impulse')).toThrow(
        'Missing account info'
      );
    });
  });

  describe('authenticated', () => {
    beforeAll(() => {
      auth.session = auth.getActiveSession();
    });

    test('impulse deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:Impulse');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(ImpulseDeleteDocument, {
        impulse: 'T:123:Impulse',
      });
    });

    test('article deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:Article');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(ArticleDeleteDocument, {
        article: 'T:123:Article',
      });
    });

    test('comment deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:Comment');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(CommentDeleteDocument, {
        comment: 'T:123:Comment',
      });
    });

    test('comment rating deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:CommentRating');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(CommentRatingDeleteDocument, {
        commentRating: 'T:123:CommentRating',
      });
    });

    test('content rating deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:ContentRating');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(ContentRatingDeleteDocument, {
        contentRating: 'T:123:ContentRating',
      });
    });

    test('group deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:Group');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(GroupDeleteDocument, {
        group: 'T:123:Group',
      });
    });

    test('membership deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:Membership');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(MembershipDeleteDocument, {
        membership: 'T:123:Membership',
      });
    });

    test('membership invite deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:MembershipInvite');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(
        MembershipInviteDeleteDocument,
        {
          membershipInvite: 'T:123:MembershipInvite',
        }
      );
    });

    test('membership request deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:MembershipRequest');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(
        MembershipRequestDeleteDocument,
        {
          membershipRequest: 'T:123:MembershipRequest',
        }
      );
    });

    test('group deletion', async () => {
      const { result } = renderHook(() => useEntityDelete(), {
        wrapper: TestingContext,
      });
      await result.current('T:123:Task');
      expect(apollo.mutate).toHaveBeenCalledTimes(1);
      expect(apollo.mutate).toHaveBeenCalledWith(TaskDeleteDocument, {
        task: 'T:123:Task',
      });
    });
  });
});
