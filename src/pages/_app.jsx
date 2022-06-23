import { ThemeProvider } from "@mui/material";
import theme from "theme";
import AdminPageContainer from "components/admin/AdminPageContainer";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "redux/store";
import Navbar from "components/Navbar";

// const Provider = ({ children }) => {
//   return children;
// };

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {router.pathname.startsWith("/admin") ? (
          <AdminPageContainer children={<Component {...pageProps} />} />
        ) : (
          <>
            {router.pathname.startsWith("/register") ? undefined : <Navbar />}
            <Component {...pageProps} />
          </>
        )}
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
