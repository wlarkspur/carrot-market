import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  console.log("APP IS RUNNING");

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      ></Script>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          //@ts-ignore
          window.fbAsyncInit = function () {
            //@ts-ignore
            FB.init({
              appId: "your-app-id",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v17.0",
            });
          };
        }}
      ></Script>
    </SWRConfig>
  );
}
