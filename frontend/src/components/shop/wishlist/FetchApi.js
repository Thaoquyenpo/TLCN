import axios from "axios";
// eslint-disable-next-line
const apiURL = process.env.REACT_APP_API_URL;

export const wishListProducts = async () => {
  let productArray = JSON.parse(localStorage.getItem("wishList"));
  try {
    let res = await axios.post(`http://localhost:8000/api/product/wish-product`, {
      productArray,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
