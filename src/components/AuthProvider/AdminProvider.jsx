import axiosInstance from "configs/api";
import jsCookie from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/reducers/auth";

const AdminProvider = ({ children }) => {
  const dispatch = useDispatch();
  const adminToken = jsCookie.get("admin_token");
  const userToken = jsCookie.get("user_token");

  const authorizeAdmin = async () => {
    if (adminToken) {
      try {
        const adminResponse = await axiosInstance.get(
          "/auth/admin/refresh-token"
        );
        if (!adminResponse) {
          throw new Error("admin on deleted");
        }

        jsCookie.set("admin_token", adminResponse?.data?.result?.token || "");
        console.log(adminResponse?.data?.result);

        dispatch(login(adminResponse?.data?.result?.user));
      } catch (err) {
        console.log(err);
      }
    } else if (userToken) {
      try {
        const userResponse = await axiosInstance.get(
          "/auth/user/refresh-token"
        );
        if (!userResponse) {
          throw new Error("user on deleted");
        }

        jsCookie.set("user_token", userResponse?.data?.result?.token || "");
        console.log(userResponse?.data?.result);

        dispatch(login(userResponse?.data?.result?.user));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    authorizeAdmin();
  }, []);
  return children;
};

export default AdminProvider;
