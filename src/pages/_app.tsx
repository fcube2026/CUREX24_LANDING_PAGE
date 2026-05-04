import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CursorGlow from "../components/CursorGlow";
import TouchInteractions from "../components/TouchInteractions";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <GoogleOAuthProvider clientId="274950489267-avnsah1g3mviqks26vl61cnk04v3n6vk.apps.googleusercontent.com">
      <CursorGlow />
      <TouchInteractions />
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );

}