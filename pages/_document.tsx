import { Html, Head, Main, NextScript } from "next/document";

import Nav from "../components/Nav.tsx";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Nav />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
