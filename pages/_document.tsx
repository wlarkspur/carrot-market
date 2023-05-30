import { Html, Head, Main, NextScript } from "next/document";

/* export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} */

//document component는 서버사이드에서 렌더링 되므로 onClick같은 이벤트 사용 불가하다.

export default function MyDocument() {
  console.log("DOCUMENT IS RUNNING");
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&display=swap"
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
