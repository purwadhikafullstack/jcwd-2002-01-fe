import { ThemeProvider } from "@mui/material";
import theme from "theme";
import AdminPageContainer from "components/admin/AdminPageContainer";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "redux/store";
import Navbar from "components/Navbar";
import AdminProvider from "components/AuthProvider/AdminProvider";
import CartProvider from "components/CartProvider";

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
              <CartProvider>
                {router.pathname.startsWith("/register") ||
                router.pathname.startsWith("/verification_page") ||
                router.pathname.startsWith("/login") ||
                router.pathname.startsWith("/stock") ? undefined : (
                  <Navbar />
                )}
                <Component {...pageProps} />
              </CartProvider>
            </>
          )}
        </AdminProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
