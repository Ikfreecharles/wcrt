import { BiPlus } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { GroupWindow } from 'components/group/misc';
import { GroupContentList } from 'components/group/data';
import { GroupEntityCreateButton } from 'components/group/control';

/** Renders the group contents view. Meant to be used within a group context. */
export const GroupContents: React.FC = () => {
  const { t } = useTranslation();

  return (
    <GroupWindow
      title={t('group:tool.contents.title')}
      footer={
        <GroupEntityCreateButton
          icon={BiPlus}
          label={t('action.createArticle')}
          href="/contents/new"
        />
      }
      noPadding
      bottomGutter={11}
    >
      <GroupContentList />
    </GroupWindow>
  );
};
