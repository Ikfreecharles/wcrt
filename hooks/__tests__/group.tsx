import { renderHook, TestingContext, auth, apollo, submit } from 'testing/util';
import {
  GroupCreateDocument,
  GroupModifyDocument,
  GroupAssignDocument,
} from 'lib/graphql';
import { useGroupSubmit } from 'hooks/group';

jest.mock('hooks/profile');
jest.mock('hooks/membership');

describe('useGroupSubmit', () => {
  const mockedGroup = {
    __typename: 'Group',
    id: 'T:123:Group',
    administeredBy: {
      count: 0,
      edges: [],
    },
  };

  beforeAll(() => {
    auth.session = auth.getActiveSession();
    apollo.response = {
      groupCreate: { ...mockedGroup },
      groupSetLocatedByAddressRelation: { ...mockedGroup },
    };
  });

  describe('new group', () => {
    test('create and assign', async () => {
      const { result } = renderHook(() => useGroupSubmit(), {
        wrapper: TestingContext,
      });
      await result.current({
        name: 'Sample name',
        info: 'Sample info',
        image: null,
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
        categories: [],
        locations: [],
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(GroupCreateDocument, {
        name: 'Sample name',
        info: 'Sample info',
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
      });
      expect(apollo.mutate).toHaveBeenCalledWith(GroupAssignDocument, {
        group: 'T:123:Group',
        image: null,
        category: null,
        address: null,
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith(
        'membership',
        'T:123:OnlineAccount',
        'admin',
        'T:123:Group'
      );
    });

    test('create and assign with details', async () => {
      const { result } = renderHook(() => useGroupSubmit(), {
        wrapper: TestingContext,
      });
      await result.current({
        name: 'Sample name',
        info: 'Sample info',
        image: { id: 'T:123:Image', resourceLocation: '' },
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
        categories: ['T:123:Category'],
        locations: ['T:123:Address'],
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(GroupAssignDocument, {
        group: 'T:123:Group',
        image: 'T:123:Image',
        category: 'T:123:Category',
        address: 'T:123:Address',
      });
    });
  });

  describe('new group with impulse', () => {
    test('create and assign', async () => {
      const { result } = renderHook(
        () => useGroupSubmit(undefined, 'T:123:Impulse'),
        {
          wrapper: TestingContext,
        }
      );
      await result.current({
        name: 'Sample name',
        info: 'Sample info',
        image: null,
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
        categories: [],
        locations: [],
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(GroupCreateDocument, {
        name: 'Sample name',
        info: 'Sample info',
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
        impulse: 'T:123:Impulse',
      });
    });
  });

  describe('existing group', () => {
    test('modify and assign', async () => {
      const { result } = renderHook(() => useGroupSubmit('T:456:Group'), {
        wrapper: TestingContext,
      });
      await result.current({
        name: 'Sample name',
        info: 'Sample info',
        image: null,
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
        categories: [],
        locations: [],
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(GroupModifyDocument, {
        group: 'T:456:Group',
        name: 'Sample name',
        info: 'Sample info',
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
      });
      expect(apollo.mutate).toHaveBeenCalledWith(GroupAssignDocument, {
        group: 'T:456:Group',
        image: null,
        category: null,
        address: null,
      });
    });

    test('modify and assign with details', async () => {
      const { result } = renderHook(() => useGroupSubmit('T:456:Group'), {
        wrapper: TestingContext,
      });
      await result.current({
        name: 'Sample name',
        info: 'Sample info',
        image: { id: 'T:123:Image', resourceLocation: '' },
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
        categories: ['T:123:Category'],
        locations: ['T:123:Address'],
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(GroupAssignDocument, {
        group: 'T:456:Group',
        image: 'T:123:Image',
        category: 'T:123:Category',
        address: 'T:123:Address',
      });
    });
  });
});
