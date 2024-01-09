import "@/styles/globals.css";
import MainLayout from "./_layouts/MainLayout";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
