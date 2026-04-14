import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <GoogleOAuthProvider clientId="274950489267-avnsah1g3mviqks26vl61cnk04v3n6vk.apps.googleusercontent.com">
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );

}