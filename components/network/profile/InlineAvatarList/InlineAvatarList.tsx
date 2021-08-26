import { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { AvatarList } from 'components/network/profile';
import { useLayoutEffect } from 'hooks/ssr';
import clsx from 'clsx';

type Props = Omit<
  React.ComponentProps<typeof AvatarList>,
  'compact' | 'maxItems'
> & {
  /** Custom styles */
  className?: string;
};

const useStyles = makeStyles(() => ({
  root: {
    flex: '1',
    display: 'flex',
  },
}));

/**
 * Renders a compact variant of the avatar list. The component is layout
 * sensitive and automatically determines how many items can be shown.
 */
export const InlineAvatarList: React.FC<Props> = ({
  className,
  ...listProps
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();
  const classes = useStyles();

  const handleResize = () => {
    if (targetRef.current) setWidth(targetRef.current.offsetWidth);
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const avatarWidth = 32;
  const lastAvatarWidth = 40;
  const maxItems = width
    ? Math.max(0, Math.floor((width - lastAvatarWidth) / avatarWidth)) + 1
    : undefined;

  return (
    <div ref={targetRef} className={clsx(classes.root, className)}>
      <AvatarList {...listProps} compact maxItems={maxItems} />
    </div>
  );
};
