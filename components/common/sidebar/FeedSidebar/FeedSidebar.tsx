import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Theme, useMediaQuery } from '@material-ui/core';
import { BiSlider } from 'react-icons/bi';

import { FeedFilters } from 'types';
import { useTranslation } from 'lib/i18n';
import { SidebarWrapper, SidebarSection } from 'components/common/sidebar';
import {
  AddressInput,
  CategoryInput,
  OptionInput,
} from 'components/common/input';

type Props = {
  /** The current filter state */
  filters: FeedFilters;
  /** A function to populate the filter state */
  setFilters: Dispatch<SetStateAction<FeedFilters>>;
  /** Disable the filter controls */
  loading: boolean;
  /** A custom label for the mobile preview */
  label?: string;
};

/** Renders several sidebar sections meant to be used for filtering the content of a feed. */
export const FeedSidebar: React.FC<Props> = ({
  filters,
  setFilters,
  loading,
  label,
}) => {
  const { t } = useTranslation();
  const form = useForm<FeedFilters>();
  const isDesktop = useMediaQuery<Theme>(({ breakpoints }) =>
    breakpoints.up('md')
  );

  // Retrieve filter changes from the parent component.
  useEffect(() => {
    let filterKey: keyof typeof filters;
    for (filterKey in filters) {
      form.setValue(filterKey, filters[filterKey]);
    }
  }, [filters]);

  // Propagate filter changes to the parent component.
  const handleFilterChange = () => setFilters(form.getValues());

  return (
    <SidebarWrapper
      title={t('label.filter')}
      label={label || t('label.feedContent')}
      icon={BiSlider}
      modal={!isDesktop}
    >
      {filters.type && (
        <SidebarSection title={t('label.types')}>
          <OptionInput
            name="type"
            listProps={{
              options: [
                { name: 'impulse' },
                { name: 'topic' },
                { name: 'article' },
              ],
              translationNamespace: 'content.type',
            }}
            onChange={handleFilterChange}
            disabled={loading}
            use={form}
            disableSpacing
          />
        </SidebarSection>
      )}

      {filters.category && (
        <SidebarSection title={t('label.categories')}>
          <CategoryInput
            name="category"
            onChange={handleFilterChange}
            disabled={loading}
            use={form}
            disableSpacing
          />
        </SidebarSection>
      )}

      {filters.location && (
        <SidebarSection title={t('label.locations')}>
          <AddressInput
            name="location"
            onChange={handleFilterChange}
            disabled={loading}
            use={form}
            disableSpacing
          />
        </SidebarSection>
      )}
    </SidebarWrapper>
  );
};
