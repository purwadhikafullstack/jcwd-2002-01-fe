import { ThemeProvider } from "@mui/material";
import theme from "theme";
import AdminPageContainer from "components/admin/AdminPageContainer";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "redux/store";
import Navbar from "components/Navbar";
import AdminProvider from "components/AuthProvider/AdminProvider";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AdminProvider>
          {router.pathname.startsWith("/admin") ? (
            <AdminPageContainer children={<Component {...pageProps} />} />
          ) : (
            <>
              {router.pathname.startsWith("/register") ||
              router.pathname.startsWith("/verification_page") ||
              router.pathname.startsWith("/login") ? undefined : (
                <Navbar />
              )}
              <Component {...pageProps} />
            </>
          )}
        </AdminProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
