import { renderHook, TestingContext, auth, apollo, submit } from 'testing/util';
import {
  ImpulseCreateDocument,
  ImpulseModifyDocument,
  ImpulseAssignDocument,
} from 'lib/graphql';
import { useImpulseSubmit } from 'hooks/impulse';

jest.mock('hooks/profile');
jest.mock('hooks/comment');

describe('useImpulseSubmit', () => {
  beforeAll(() => {
    auth.session = auth.getActiveSession();
    apollo.response = {
      impulseCreate: {
        __typename: 'Impulse',
        id: 'T:123:Impulse',
      },
      impulseModifyCategorizedByCategoryRelation: {
        __typename: 'Impulse',
        id: 'T:123:Impulse',
      },
    };
  });

  describe('new impulse', () => {
    test('create and assign', async () => {
      const { result } = renderHook(() => useImpulseSubmit(), {
        wrapper: TestingContext,
      });
      await result.current({
        title: 'Sample title',
        intro: 'Sample description',
        images: [],
        locations: [],
        categories: [],
        hasSolution: false,
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(ImpulseCreateDocument, {
        title: 'Sample title',
        intro: 'Sample description',
        person: 'T:123:Person',
      });
      expect(apollo.mutate).toHaveBeenCalledWith(ImpulseAssignDocument, {
        impulse: 'T:123:Impulse',
        images: [],
        address: null,
        categories: [],
      });
      expect(submit).toHaveBeenCalledTimes(0);
    });

    test('create and assign with details', async () => {
      const { result } = renderHook(() => useImpulseSubmit(), {
        wrapper: TestingContext,
      });
      await result.current({
        title: 'Sample title',
        intro: 'Sample description',
        images: [
          { id: 'T:123:Image', resourceLocation: '' },
          { id: 'T:456:Image', resourceLocation: '' },
        ],
        locations: ['T:123:Address'],
        categories: ['T:123:Category', 'T:456:Category'],
        hasSolution: false,
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(ImpulseAssignDocument, {
        impulse: 'T:123:Impulse',
        images: ['T:123:Image', 'T:456:Image'],
        address: 'T:123:Address',
        categories: ['T:123:Category', 'T:456:Category'],
      });
      expect(submit).toHaveBeenCalledTimes(0);
    });

    test('create and assign with comment', async () => {
      const { result } = renderHook(() => useImpulseSubmit(), {
        wrapper: TestingContext,
      });
      await result.current({
        title: 'Sample title',
        intro: 'Sample description',
        images: [],
        locations: [],
        categories: [],
        hasSolution: true,
        solution: 'Sample solution',
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('comment', 'T:123:Impulse', {
        text: 'Sample solution',
      });
    });
  });

  describe('existing impulse', () => {
    test('modify and assign', async () => {
      const { result } = renderHook(() => useImpulseSubmit('T:456:Impulse'), {
        wrapper: TestingContext,
      });
      await result.current({
        title: 'New title',
        intro: 'New description',
        images: [],
        locations: [],
        categories: [],
        hasSolution: false,
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(ImpulseModifyDocument, {
        impulse: 'T:456:Impulse',
        title: 'New title',
        intro: 'New description',
      });
      expect(apollo.mutate).toHaveBeenCalledWith(ImpulseAssignDocument, {
        impulse: 'T:456:Impulse',
        images: [],
        address: null,
        categories: [],
      });
    });

    test('modify and assign with details', async () => {
      const { result } = renderHook(() => useImpulseSubmit('T:456:Impulse'), {
        wrapper: TestingContext,
      });
      await result.current({
        title: 'New title',
        intro: 'New description',
        images: [
          { id: 'T:123:Image', resourceLocation: '' },
          { id: 'T:456:Image', resourceLocation: '' },
        ],
        categories: ['T:456:Category', 'T:789:Category'],
        locations: ['T:456:Address'],
        hasSolution: false,
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(ImpulseAssignDocument, {
        impulse: 'T:456:Impulse',
        images: ['T:123:Image', 'T:456:Image'],
        address: 'T:456:Address',
        categories: ['T:456:Category', 'T:789:Category'],
      });
    });
  });
});
