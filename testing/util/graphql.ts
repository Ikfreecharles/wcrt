export const graphqlResponse = {
  accountInfo: {
    me: {
      id: 'T:123:OnlineAccount',
      email: 'test@example.com',
      createdAt: '2020-11-30T09:00:06Z',
      represents: {
        __typename: 'Person',
        id: 'T:123:Person',
        name: 'Sample user',
        info: 'Lorem ipsum',
        intro: 'Lorem ipsum dolor sit amet',
        imagedBy: {
          id: 'T:123:Image',
          resourceLocation: 'https://source.unsplash.com/80x80/?portrait',
        },
        locatedByAddress: {
          id: 'T:123:Address',
          addressLocality: 'Sample location',
        },
        createsContent: {
          count: 12,
        },
        createsComments: {
          count: 34,
        },
        createsRating: {
          count: 56,
        },
      },
    },
  },
  categories: {
    categories: {
      edges: [
        {
          node: {
            id: 'T:123:Category',
            name: 'culture',
          },
        },
        {
          node: {
            id: 'T:456:Category',
            name: 'administration',
          },
        },
        {
          node: {
            id: 'T:789:Category',
            name: 'environment',
          },
        },
      ],
    },
  },
  addresses: {
    addresses: {
      edges: [
        {
          node: {
            id: 'T:123:Address',
            addressLocality: 'Sample location',
          },
        },
        {
          node: {
            id: 'T:456:Address',
            addressLocality: 'Some address',
          },
        },
        {
          node: {
            id: 'T:789:Address',
            addressLocality: 'Random city',
          },
        },
      ],
    },
  },
};
