import { ThemeProvider } from "@mui/material";
import theme from "theme";
import AdminPageContainer from "components/admin/AdminPageContainer";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Navbar from "components/Navbar";
import UserSidebar from "components/Sidebar";

const Provider = ({ children }) => {
  return children;
};

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <Provider>
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
