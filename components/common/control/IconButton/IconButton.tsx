import { forwardRef, ReactElement } from 'react';
import {
  Tooltip,
  SvgIcon,
  IconButton as MuiIconButton,
  IconButtonProps,
  TooltipProps,
  Box,
} from '@material-ui/core';
import { IconType } from 'react-icons';

import { ConditionalWrapper } from 'components/common/misc';

type Props = Omit<IconButtonProps, 'color'> & {
  /** The label used as tooltip */
  title: string;
  /** The tooltip placement */
  titlePlacement?: TooltipProps['placement'];
  /** The icon */
  icon: IconType;
  /** The icon color */
  color?: 'inherit' | 'primary' | 'secondary' | 'error';
};

/** Wraps an icon button with an appropriate tooltip for a11y concerns. */
export const IconButton: React.FC<Props> = forwardRef(function IconButton(
  { title, titlePlacement, icon, color, ...props },
  ref
) {
  return (
    <Box color={color && color !== 'inherit' ? `${color}.main` : undefined}>
      <ConditionalWrapper
        condition={!props.disabled}
        wrap={(children) => (
          <Tooltip title={title} placement={titlePlacement}>
            {children as ReactElement}
          </Tooltip>
        )}
      >
        <MuiIconButton
          ref={ref}
          aria-label={title}
          color={color ? 'inherit' : undefined}
          {...props}
        >
          <SvgIcon component={icon} />
        </MuiIconButton>
      </ConditionalWrapper>
    </Box>
  );
});
