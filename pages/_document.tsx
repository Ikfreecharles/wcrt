import { Children } from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import {
  ServerStyleSheets,
  hslToRgb,
  rgbToHex,
  createGenerateClassName,
} from '@material-ui/core';
import CleanCSS from 'clean-css';

import { brandPalette } from 'lib/theme';

const appName = process.env.NEXT_PUBLIC_APP_NAME;
const appColor =
  process.env.NEXT_PUBLIC_CUSTOM_COLOR_PRIMARY ||
  rgbToHex(hslToRgb(brandPalette.light.primary.color)).substr(0, 7);

class MyDocument extends Document {
  render = () => (
    <Html>
      <Head>
        <link rel="stylesheet" href="/static/fonts/inter.css" />

        <link rel="shortcut icon" href="/static/icons/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/icons/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/icons/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content={appName} />
        <link
          rel="mask-icon"
          href="/static/icons/safari-pinned-tab.svg"
          color={appColor}
        />
        <meta name="application-name" content={appName} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/static/icons/site.webmanifest" />
        <meta
          name="msapplication-config"
          content="/static/icons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content={appColor} />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets({
    serverGenerateClassName: createGenerateClassName({
      disableGlobal: process.env.NODE_ENV === 'production',
    }),
  });
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const minifiedCSS = new CleanCSS().minify(sheets.toString()).styles;

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      <style
        id="jss-server-side"
        key="jss-server-side"
        dangerouslySetInnerHTML={{ __html: minifiedCSS }}
      />,
    ],
  };
};

export default MyDocument;
