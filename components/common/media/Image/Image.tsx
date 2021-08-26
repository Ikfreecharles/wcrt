import { useState } from 'react';
import NextImage from 'next/image';
import { Box, CircularProgress, SvgIcon, makeStyles } from '@material-ui/core';
import { BiImage } from 'react-icons/bi';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import { DocumentFragment } from 'lib/graphql';
import { imageSizes, getResizedImageUrl } from 'util/image';

type Props = {
  /** Raw GraphQL data */
  file?: DocumentFragment | null;
  /** The accessible image description */
  alt: string;
  /** The expected aspect ratio (otherwise fallback to `fill` mode) */
  aspectRatio?: number;
  /** Use the image as low contrast background only */
  backgroundBlend?: boolean;
  /** The image size to request from the CDN */
  resize?: keyof typeof imageSizes;
  /** Custom styles */
  className?: string;
};

type StyleProps = Pick<Props, 'aspectRatio' | 'backgroundBlend'> & {
  ready: boolean;
};

const useStyles = makeStyles(({ palette, transitions }) => ({
  root: ({ aspectRatio }: StyleProps) => ({
    position: 'relative',
    width: !aspectRatio ? '100%' : undefined,
    height: !aspectRatio ? '100%' : undefined,
    backgroundColor: palette.action.disabledBackground,
  }),
  imgContainer: ({ aspectRatio, backgroundBlend, ready }: StyleProps) => ({
    width: !aspectRatio ? '100%' : undefined,
    height: !aspectRatio ? '100%' : undefined,
    opacity: ready ? (backgroundBlend ? 0.2 : 1) : 0,
    transition: transitions.create('opacity', {
      duration: 1200,
    }),
    filter: backgroundBlend ? 'grayscale(100%)' : undefined,
  }),
  img: ({ aspectRatio }: StyleProps) => ({
    objectFit: aspectRatio ? 'fill' : 'cover',
  }),
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  fallback: ({ aspectRatio }: StyleProps) => ({
    position: 'relative',
    width: '100%',
    height: aspectRatio ? 0 : '100%',
    paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100}%` : undefined,
    overflow: 'hidden',
    color: palette.action.disabled,
  }),
  fallbackIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    height: 'auto',
  },
}));

/**
 * Renders an image hosted at our own CDN. Loads the image only once in the view
 * and handles the loading state.
 */
export const Image: React.FC<Props> = ({
  file,
  alt,
  resize = 'content',
  aspectRatio,
  backgroundBlend,
  className,
}) => {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const classes = useStyles({ aspectRatio, backgroundBlend, ready });

  const imageUrl = getResizedImageUrl(file?.resourceLocation, resize);

  const handleImgLoad = () => setReady(true);
  const handleImgError = () => setFailed(true);

  return (
    <Box className={clsx(classes.root, className)}>
      {imageUrl && !failed ? (
        <>
          <Box className={classes.imgContainer}>
            {aspectRatio ? (
              <NextImage
                unoptimized
                layout="responsive"
                src={imageUrl}
                alt={alt}
                onLoad={handleImgLoad}
                onError={handleImgError}
                className={classes.img}
                width={aspectRatio * 100}
                height={100}
              />
            ) : (
              <NextImage
                unoptimized
                layout="fill"
                src={imageUrl}
                alt={alt}
                onLoad={handleImgLoad}
                onError={handleImgError}
                className={classes.img}
              />
            )}
          </Box>

          {!ready && !backgroundBlend && (
            <Box className={classes.loader}>
              <CircularProgress
                color="inherit"
                aria-label={t('label.loadingImage')}
              />
            </Box>
          )}
        </>
      ) : (
        <Box className={classes.fallback} data-testid="fallback">
          <SvgIcon component={BiImage} className={classes.fallbackIcon} />
        </Box>
      )}
    </Box>
  );
};
