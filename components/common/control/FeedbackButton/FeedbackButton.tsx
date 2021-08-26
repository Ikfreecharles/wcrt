import { useState } from 'react';
import { BiCommentError } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { IconButton } from 'components/common/control';
import { FeedbackDialog } from 'components/common/dialog';

/** Renders a simple button to open the global feedback dialog. */
export const FeedbackButton: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  return (
    <>
      <IconButton
        title={t('action.giveFeedback')}
        icon={BiCommentError}
        onClick={handleClick}
      />

      <FeedbackDialog open={open} setOpen={setOpen} />
    </>
  );
};
