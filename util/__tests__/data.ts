import { getGroupMemberAvatars, getViewerGroupRole } from 'util/data';

describe('getGroupMemberAvatars', () => {
  test('default', () => {
    expect(
      getGroupMemberAvatars({
        edges: [
          {
            node: {
              ownedBy: {
                represents: {
                  __typename: 'Person',
                  id: 'T:123:Person',
                  name: 'First person',
                  imagedBy: { id: 'T:123:Image', resourceLocation: '' },
                },
              },
            },
          },
          {
            node: {
              ownedBy: {
                represents: {
                  __typename: 'Person',
                  id: 'T:123:Person',
                  name: 'Second person',
                  imagedBy: { id: 'T:456:Image', resourceLocation: '' },
                },
              },
            },
          },
        ],
      })
    ).toEqual([
      {
        __typename: 'Person',
        id: 'T:123:Person',
        imagedBy: { id: 'T:123:Image', resourceLocation: '' },
        name: 'First person',
      },
      {
        __typename: 'Person',
        id: 'T:123:Person',
        imagedBy: { id: 'T:456:Image', resourceLocation: '' },
        name: 'Second person',
      },
    ]);
  });

  test('filter incomplete items', () => {
    expect(
      getGroupMemberAvatars({
        edges: [
          {
            node: {
              ownedBy: {
                represents: {
                  __typename: 'Person',
                  id: 'T:123:Person',
                  name: 'First person',
                  imagedBy: { id: 'T:123:Image', resourceLocation: '' },
                },
              },
            },
          },
          {
            node: {
              ownedBy: {
                represents: null,
              },
            },
          },
        ],
      })
    ).toEqual([
      {
        __typename: 'Person',
        id: 'T:123:Person',
        imagedBy: { id: 'T:123:Image', resourceLocation: '' },
        name: 'First person',
      },
    ]);
  });
});

describe('getViewerGroupRole', () => {
  test('member', () => {
    expect(
      getViewerGroupRole({
        _viewer: {
          administeredBy: {
            count: 1,
            edges: [{ node: { definedBy: { name: 'groupMember' } } }],
          },
        },
      })
    ).toEqual('member');
  });

  test('admin', () => {
    expect(
      getViewerGroupRole({
        _viewer: {
          administeredBy: {
            count: 1,
            edges: [{ node: { definedBy: { name: 'groupAdmin' } } }],
          },
        },
      })
    ).toEqual('admin');
  });

  test('unknown', () => {
    expect(
      getViewerGroupRole({
        _viewer: {
          administeredBy: {
            count: 1,
            edges: [{ node: { definedBy: { name: 'something' } } }],
          },
        },
      })
    ).toEqual('member');
  });

  test('undefined', () => {
    expect(
      getViewerGroupRole({
        _viewer: {
          administeredBy: {
            count: 1,
            edges: [{ node: { definedBy: null } }],
          },
        },
      })
    ).toEqual('member');
  });

  test('unauthorized', () => {
    expect(
      getViewerGroupRole({
        _viewer: {
          administeredBy: {
            count: 0,
            edges: [],
          },
        },
      })
    ).toEqual('member');
  });
});
