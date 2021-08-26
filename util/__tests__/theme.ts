import { brandPalette } from 'lib/theme';
import { createTypographyGenerator, createPaletteConfig } from 'util/theme';

describe('generateTypography', () => {
  const generateTypography = createTypographyGenerator(14, 16, 1.2, {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  });

  test('basic font styles', () => {
    expect(generateTypography('regular', 1, 3)).toEqual({
      fontSize: '1.05rem',
      fontWeight: 400,
      letterSpacing: '0em',
      lineHeight: 1.4285714285714286,
      hyphens: 'auto',
    });
  });

  test('extra font styles', () => {
    expect(
      generateTypography('semiBold', 0, 3, 0.02, false, {
        textTransform: 'uppercase',
      })
    ).toEqual({
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
      lineHeight: 1.7142857142857142,
      hyphens: 'manual',
      textTransform: 'uppercase',
    });
  });
});

describe('paletteConfig', () => {
  describe('default', () => {
    const paletteConfig = createPaletteConfig(brandPalette, {
      light: { primary: undefined, secondary: undefined },
      dark: { primary: undefined, secondary: undefined },
    });

    test('light mode', () => {
      expect(paletteConfig.light).toMatchObject({
        primary: {
          main: 'hsla(195.78947368421055, 58.76288659793815%, 38.03921568627451%, 1)',
        },
        secondary: {
          main: 'hsla(78.03680981595093, 77.99043062200957%, 40.98039215686274%, 1)',
        },
      });
    });

    test('dark mode', () => {
      expect(paletteConfig.dark).toMatchObject({
        primary: {
          main: 'hsla(198.7012987012987, 49.67741935483872%, 69.6078431372549%, 1)',
        },
        secondary: {
          main: 'hsla(79.16666666666669, 50.70422535211269%, 72.15686274509805%, 1)',
        },
      });
    });
  });

  describe('custom', () => {
    const paletteConfig = createPaletteConfig(brandPalette, {
      light: { primary: '#ff0000', secondary: '#00ff00' },
      dark: { primary: '#0000ff', secondary: '#ff0000' },
    });

    test('light mode', () => {
      expect(paletteConfig.light).toMatchObject({
        primary: {
          main: '#ff0000',
        },
        secondary: {
          main: '#00ff00',
        },
      });
    });

    test('dark mode', () => {
      expect(paletteConfig.dark).toMatchObject({
        primary: {
          main: '#0000ff',
        },
        secondary: {
          main: '#ff0000',
        },
      });
    });
  });
});
