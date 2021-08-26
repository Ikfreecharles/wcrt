import { useState } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { BiMap } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { Maybe, AddressFragment } from 'lib/graphql';
import { OptionList, ShareButton } from 'components/common/control';
import { EntityEditDialog } from 'components/common/dialog';
import { IconWrapper } from 'components/common/misc';

type Props = {
  /** The content ID */
  id: string;
  /** The content categories */
  categories: string[];
  /** The content location */
  location?: Maybe<Pick<AddressFragment, 'addressCountry' | 'addressLocality'>>;
  /** Display an edit button */
  editable?: boolean;
  /** Custom styles */
  className?: string;
};

/**
 * Renders some content meta data (categories and location) and interactions
 * (share and edit). Meant to be used within content pages.
 */
export const ContentFooter: React.FC<Props> = ({
  id,
  categories,
  location,
  editable,
  className,
}) => {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => setEditing(true);

  return (
    <Box display="flex" alignItems="flex-start" className={className}>
      <Box flex="1">
        {categories.length > 0 && (
          <Box mb={location ? 1.25 : undefined}>
            <OptionList
              options={categories.map((item) => ({
                name: item,
              }))}
              translationNamespace="content.category"
            />
          </Box>
        )}

        {location && (
          <Box color="text.secondary" py={0.75}>
            <IconWrapper icon={BiMap} title={t('label.location')}>
              <Typography variant="body2">
                {location.addressLocality}, {location.addressCountry}
              </Typography>
            </IconWrapper>
          </Box>
        )}
      </Box>

      <Box display="flex" alignItems="center" m={-1}>
        {editable && (
          <>
            <Button onClick={handleEditClick}>{t('action.edit')}</Button>
            <EntityEditDialog id={id} open={editing} setOpen={setEditing} />
          </>
        )}

        <ShareButton />
      </Box>
    </Box>
  );
};
