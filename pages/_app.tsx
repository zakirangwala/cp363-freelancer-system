import "@/styles/globals.css";
import type { AppProps } from "next/app";

// root component that wraps all pages and provides global styles
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
