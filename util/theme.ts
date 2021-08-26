import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Palette } from '@wecreateio/design-tokens';
import { CSSProperties } from '@material-ui/styles';

/**
 * Creates a function to generate typography styles according to a preconfigured
 * modular scale.
 */
export const createTypographyGenerator =
  (
    baseFontSize: number,
    htmlFontSize: number,
    modularScale: number,
    fontWeights: Record<'regular' | 'medium' | 'semiBold' | 'bold', number>
  ) =>
  (
    weight: keyof typeof fontWeights,
    size: number,
    leading: number,
    tracking = 0,
    hyphenation = true,
    extraStyles?: CSSProperties
  ): TypographyStyleOptions => {
    const sizeFactor = Math.pow(modularScale, size);

    return {
      fontWeight: fontWeights[weight],
      fontSize: `${(baseFontSize * sizeFactor) / htmlFontSize}rem`,
      lineHeight: (leading * 8) / baseFontSize / sizeFactor,
      letterSpacing: `${tracking}em`,
      hyphens: hyphenation ? 'auto' : 'manual',
      ...extraStyles,
    };
  };

/** The palette types we support. */
type PaletteKey = 'light' | 'dark';

/** The custom color keys we support. */
type ColorKey = 'primary' | 'secondary' | 'error';

/** Creates a palette config based on a default palette and custom color overwrites. */
export const createPaletteConfig = (
  defaultPalette: Palette,
  customColors: Record<
    PaletteKey,
    Partial<Record<ColorKey, string | undefined>>
  >
): Record<PaletteKey, PaletteOptions> => {
  const paletteConfig: Record<PaletteKey, PaletteOptions> = {
    light: { type: 'light' },
    dark: { type: 'dark' },
  };

  (Object.keys(paletteConfig) as PaletteKey[]).forEach((paletteKey) => {
    (['primary', 'secondary', 'error'] as ColorKey[]).forEach(
      (colorKey: ColorKey) => {
        paletteConfig[paletteKey][colorKey] = customColors[paletteKey][colorKey]
          ? { main: customColors[paletteKey][colorKey] as string }
          : {
              main: defaultPalette[paletteKey][colorKey].color,
              light:
                defaultPalette[paletteKey][`${colorKey}Light` as const].color,
              dark: defaultPalette[paletteKey][`${colorKey}Dark` as const]
                .color,
              contrastText:
                defaultPalette[paletteKey][`${colorKey}Contrast` as const]
                  .color,
            };
      }
    );

    paletteConfig[paletteKey].text = {
      primary: defaultPalette[paletteKey].textPrimary.color,
      secondary: defaultPalette[paletteKey].textSecondary.color,
      disabled: defaultPalette[paletteKey].textDisabled.color,
    };
  });

  return paletteConfig;
};
