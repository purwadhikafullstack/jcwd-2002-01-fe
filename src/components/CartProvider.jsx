import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "configs/api";
import { useEffect } from "react";
import { addToCart, cartCount } from "redux/reducers/cart";

const CartProvider = ({ children }) => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchCartItems = async () => {
    const userToken = jsCookie.get("user_token");

    if (userToken) {
      try {
        const res = await axiosInstance.get("/cart", {
          user_id: userSelector.id,
        });
        const cartItems = res.data;
        console.log("fetch data");
        dispatch(addToCart(cartItems.result.rows));
        dispatch(cartCount(cartItems.result.count));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (userSelector.id) {
        fetchCartItems();
      }
    }
  }, [userSelector.id]);
  return children;
};

export default CartProvider;
