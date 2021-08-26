import { useRouter } from 'next/router';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import lowerFirst from 'lodash/lowerFirst';

import { useTranslation } from 'lib/i18n';
import { useMainNavigation } from 'hooks/navigation';
import { IconBadge } from 'components/common/misc';

type Props = {
  /** Custom styles */
  className?: string;
};

/** Renders globally visible navigation links for small screens. */
export const MobileNavigation: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const menuItems = useMainNavigation(true);

  const handleNavigationChange = (
    _event: React.ChangeEvent<unknown>,
    value: string
  ) => router.push(value);

  return (
    <BottomNavigation
      showLabels
      value={menuItems.filter((item) => item.isActive)[0]?.path}
      onChange={handleNavigationChange}
      className={className}
      data-testid="mobile"
    >
      {menuItems.map(({ icon, label, path, isActive, hasMessages }) => (
        <BottomNavigationAction
          value={path}
          icon={<IconBadge icon={icon} hasActivity={hasMessages} />}
          label={label}
          aria-label={
            hasMessages
              ? `${label} (${lowerFirst(t('label.newActivity'))})`
              : label
          }
          aria-current={isActive ? 'page' : undefined}
          key={path}
        />
      ))}
    </BottomNavigation>
  );
};
