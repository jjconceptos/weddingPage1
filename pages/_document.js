// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Include the viewport meta tag */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          {/* Include the Google Fonts stylesheet */}
          <link
            href="https://fonts.googleapis.com/css2?family=Mate+SC&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
