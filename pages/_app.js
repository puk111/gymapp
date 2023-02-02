import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../store/index";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}
