const requiresAdmin = (gssp) => {
  return async (context) => {
    const savedDataUser = context.req.cookies.admin_token;

    if (!savedDataUser) {
      return {
        redirect: {
          destination: "/login_admin",
        },
      };
    }

    return gssp(context);
  };
};

export default requiresAdmin;
