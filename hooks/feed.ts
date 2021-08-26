import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import isEqual from 'lodash/isEqual';

import { extractQueryParameters } from 'util/url';

/**
 * Returns several reactive states and actions to handle filter options within a
 * feed view.
 */
export const useFeedFilters = (
  allowedFilters: ('type' | 'category' | 'location')[] = [
    'type',
    'category',
    'location',
  ]
) => {
  const router = useRouter();

  // Compose preset filters from the URL and the environment.
  const filtersFromQuery = extractQueryParameters(router.query, allowedFilters);
  const presetFilters = {
    ...filtersFromQuery,
    ...(!filtersFromQuery.location?.length && {
      location:
        process.env.NEXT_PUBLIC_CUSTOM_LOCATION?.split(',').filter(
          (item) => !!item
        ) || [],
    }),
  };

  // We need two filter states to apply loading transitions.
  const [filters, setFilters] = useState(presetFilters);
  const [newFilters, setNewFilters] = useState(presetFilters);

  // The UI needs to know whether a filter update is incoming.
  const filtersPending = !isEqual(newFilters, filters);

  // Update pending filters if the preset filters differ from the state.
  useEffect(() => {
    if (!isEqual(presetFilters, filters)) setNewFilters(filtersFromQuery);
  }, [router.query]);

  // Apply pending filters to the state and the URL on request.
  const applyNewFilters = () => {
    setFilters(newFilters);
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...Object.fromEntries(
            allowedFilters.map((item) => [item, newFilters[item] || []])
          ),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const resetFilters = () =>
    // @ts-ignore unspecific property keys of `Object.fromEntries`
    setNewFilters(Object.fromEntries(allowedFilters.map((item) => [item, []])));

  return {
    filters,
    setNewFilters,
    filtersPending,
    applyNewFilters,
    resetFilters,
  };
};
