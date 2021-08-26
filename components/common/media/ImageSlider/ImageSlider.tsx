import { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import { imageSizes } from 'util/image';
import { DocumentFragment } from 'lib/graphql';
import { IconButton } from 'components/common/control';
import { Image } from 'components/common/media';

type Props = {
  /** A list of image data */
  files: DocumentFragment[];
  /** The accessible image description */
  alt: string;
  /** The expected aspect ratio */
  aspectRatio: number;
  /** Use the images as low contrast background only */
  backgroundBlend?: boolean;
  /** The image size to request from the CDN */
  resize?: keyof typeof imageSizes;
  /** Custom styles */
  className?: string;
};

type StyleProps = {
  length: number;
  position: number;
};

const useStyles = makeStyles(({ spacing, palette, transitions }) => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  wrapper: ({ length, position }: StyleProps) => ({
    position: 'relative',
    left: `-${position}00%`,
    display: 'flex',
    width: `${length}00%`,
    transition: transitions.create('left'),
  }),
  item: ({ length }: StyleProps) => ({
    width: `${100 / length}%`,
  }),
  controls: {
    position: 'absolute',
    bottom: spacing(1),
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    color: palette.common.white,
  },
  controlIcon: {
    filter: `drop-shadow(0 0 ${spacing(1)}px ${palette.common.black})`,
  },
}));

/**
 * Renders multiple images in a horizontal layout, but only shows one image at a
 * time. Allows to navigate within the gallery.
 */
export const ImageSlider: React.FC<Props> = ({
  files,
  alt,
  resize = 'content',
  aspectRatio,
  backgroundBlend,
  className,
}) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState(0);
  const classes = useStyles({ length: files.length, position });

  const getPositionHandler = (newPosition: number) => () =>
    setPosition(newPosition);

  return (
    <Box className={clsx(className, classes.root)}>
      <Box className={classes.wrapper}>
        {files.map((item, index) => (
          <Box className={classes.item} key={index}>
            <Image
              file={item}
              alt={alt}
              resize={resize}
              aspectRatio={aspectRatio}
              backgroundBlend={backgroundBlend}
              key={index}
            />
          </Box>
        ))}
      </Box>

      {files.length > 1 && (
        <Box className={classes.controls}>
          {files.map((_item, index) => (
            <IconButton
              title={t('action.showImage', { number: index + 1 })}
              icon={index === position ? BiRadioCircleMarked : BiRadioCircle}
              size="small"
              color="inherit"
              onClick={getPositionHandler(index)}
              aria-current={index === position}
              className={classes.controlIcon}
              key={index}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
