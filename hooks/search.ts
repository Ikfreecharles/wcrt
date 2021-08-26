import { useState } from 'react';

import { useAccountSearchQuery } from 'lib/graphql';

/** Returns some helpers for searching accounts based on their profile name. */
export const useAccountSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, loading } = useAccountSearchQuery({
    variables: { value: searchValue },
    skip: searchValue.length < 2,
  });

  const results =
    data?.persons.edges
      .map((edge) => edge.node)
      .filter((item) => !!item.representedBy)
      .map(({ representedBy, ...person }) => ({
        id: representedBy!.id,
        represents: { ...person },
      })) || [];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return { searchValue, handleSearch, loading, results };
};
