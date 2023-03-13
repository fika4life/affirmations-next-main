import "@/styles/globals.css";
import Layout from "@/components/Layout";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
