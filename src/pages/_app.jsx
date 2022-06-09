import AdminPageContainer from "components/admin/AdminPageContainer";
import { useRouter } from "next/router";
import "../styles/globals.css";

const Provider = ({ children }) => {
  return children;
};

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  // if (router.pathname.startsWith("/admin")) {
  //   return (
  //     <AdminPageContainer>
  //       <Component {...pageProps} />
  //     </AdminPageContainer>
  //   );
  // }

  // return <Component {...pageProps} />;
  return (
    <Provider>
      {router.pathname.startsWith("/admin") ? (
        <AdminPageContainer children={<Component {...pageProps} />} />
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
};

export default MyApp;
