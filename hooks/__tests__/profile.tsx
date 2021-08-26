import {
  renderHook,
  TestingContext,
  auth,
  graphqlResponse,
  apollo,
} from 'testing/util';
import { PersonAssignDocument, PersonModifyDocument } from 'lib/graphql';
import { useProfile, useProfileSubmit } from 'hooks/profile';

describe('useProfile', () => {
  beforeAll(() => {
    apollo.response = { ...graphqlResponse.accountInfo };
  });

  describe('unauthenticated', () => {
    test('null', () => {
      const { result } = renderHook(() => useProfile(), {
        wrapper: TestingContext,
      });
      expect(result.current).toBe(null);
    });
  });

  describe('authenticated', () => {
    beforeAll(() => {
      auth.session = auth.getActiveSession();
    });

    test('query person', async () => {
      const { result } = renderHook(() => useProfile(), {
        wrapper: TestingContext,
      });
      expect(result.current).toEqual({
        ...graphqlResponse.accountInfo.me.represents,
        representedBy: {
          id: graphqlResponse.accountInfo.me.id,
          email: graphqlResponse.accountInfo.me.email,
        },
      });
    });
  });
});

describe('useProfileSubmit', () => {
  beforeAll(() => {
    apollo.response = { ...graphqlResponse.accountInfo };
  });

  test('modify and assign', async () => {
    const { result } = renderHook(() => useProfileSubmit(), {
      wrapper: TestingContext,
    });
    await result.current({
      name: 'Sample name',
      info: 'Sample info',
      image: null,
      locations: [],
      intro: 'Sample intro',
    });
    expect(apollo.mutate).toHaveBeenCalledTimes(2);
    expect(apollo.mutate).toHaveBeenCalledWith(PersonModifyDocument, {
      person: 'T:123:Person',
      name: 'Sample name',
      info: 'Sample info',
      intro: 'Sample intro',
    });
    expect(apollo.mutate).toHaveBeenCalledWith(PersonAssignDocument, {
      person: 'T:123:Person',
      image: null,
      address: null,
    });
  });

  test('modify and assign with details', async () => {
    const { result } = renderHook(() => useProfileSubmit(), {
      wrapper: TestingContext,
    });
    await result.current({
      name: 'Sample name',
      info: 'Sample info',
      image: { id: 'T:123:Image', resourceLocation: '' },
      locations: ['T:123:Address'],
      intro: 'Sample intro',
    });
    expect(apollo.mutate).toHaveBeenCalledTimes(2);
    expect(apollo.mutate).toHaveBeenCalledWith(PersonAssignDocument, {
      person: 'T:123:Person',
      image: 'T:123:Image',
      address: 'T:123:Address',
    });
  });
});
