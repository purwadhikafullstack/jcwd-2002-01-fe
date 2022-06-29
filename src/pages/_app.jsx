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
        {router.pathname.startsWith("/admin") ? (
          <AdminProvider>
            <AdminPageContainer children={<Component {...pageProps} />} />
          </AdminProvider>
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
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
