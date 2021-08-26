import { useState, useRef } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import { useLayoutEffect } from 'hooks/ssr';

type Props = {
  /** The iframe target URL */
  link: string;
  /** The expected aspect ratio of the media content */
  aspectRatio: number;
  /** Custom styles */
  className?: string;
};

type StyleProps = Pick<Props, 'aspectRatio'>;

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: ({ aspectRatio }: StyleProps) => ({
    position: 'relative',
    paddingBottom: `${(1 / aspectRatio) * 100}%`,
    backgroundColor: palette.common.black,
    borderRadius: 4,
    overflow: 'hidden',
  }),
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  preview: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(2),
    textAlign: 'center',
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.25,
  },
}));

/**
 * Renders embedded media from external sources in a privacy-friendly manner. A
 * preview container is shown first and the actual media can be shown on request.
 */
export const ExternalMedia: React.FC<Props> = ({
  link,
  aspectRatio,
  className,
}) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const classes = useStyles({ aspectRatio });

  const serviceName = new URL(link).hostname
    .replace('www.', '')
    .replace('youtube-nocookie', 'youtube');

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d', { alpha: false });

      if (context) {
        canvasRef.current.width = canvasRef.current.width * 2;
        canvasRef.current.height = canvasRef.current.height * 2;

        const idata = context.createImageData(
          canvasRef.current.width,
          canvasRef.current.height
        );
        const buffer32 = new Uint32Array(idata.data.buffer);

        const noise = (ctx: CanvasRenderingContext2D) => {
          let len = buffer32.length - 1;
          while (len--) buffer32[len] = Math.random() < 0.75 ? 0 : -1 >> 0;
          ctx.putImageData(idata, 0, 0);
        };

        const animate = () => {
          noise(context);
          setTimeout(() => {
            requestAnimationFrame(animate);
          }, 100);
        };

        animate();
      }
    }
  }, [canvasRef]);

  const handleClick = () => setActive(true);

  return (
    <Box className={clsx(classes.root, className)}>
      {active ? (
        <iframe
          src={link}
          frameBorder="0"
          allow="autoplay;encrypted-media;picture-in-picture"
          allowFullScreen
          className={classes.fill}
          data-testid="iframe"
        />
      ) : (
        <Box
          className={clsx(classes.fill, classes.preview)}
          data-testid="media"
        >
          <canvas ref={canvasRef} className={classes.canvas} />
          <Button variant="contained" onClick={handleClick}>
            {t('action.showExternalContent', { service: serviceName })}
          </Button>
        </Box>
      )}
    </Box>
  );
};
