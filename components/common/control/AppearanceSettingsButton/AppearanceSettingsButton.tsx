import { useState } from 'react';
import { BiCog } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { IconButton } from 'components/common/control';
import { AppearanceSettingsDialog } from 'components/common/dialog';

/** Renders a simple button to open the global appearance settings dialog. */
export const AppearanceSettingsButton: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  return (
    <>
      <IconButton
        title={t('label.display')}
        icon={BiCog}
        onClick={handleClick}
      />

      <AppearanceSettingsDialog open={open} setOpen={setOpen} />
    </>
  );
};
