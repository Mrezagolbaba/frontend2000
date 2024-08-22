import { Html, Head, Main, NextScript } from 'next/document';

export const runtime = 'experimental-edge';
export default function Document() {
  return (
    <Html lang="fa">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
