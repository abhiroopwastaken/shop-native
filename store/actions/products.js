import axios from "axios";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://react-native-aec52.firebaseio.com/products.json"
      );

      const loadedProducts = [];
      for (let key in res.data) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            res.data[key].title,
            res.data[key].img,
            res.data[key].desc,
            res.data[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
      });
    } catch (error) {
      throw err;
    }
  };
};

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id: id,
  };
};

export const addProduct = (prodObj) => {
  return async (dispatch) => {
    const res = await axios.post(
      "https://react-native-aec52.firebaseio.com/products.json",
      {
        ...prodObj,
      }
    );
    console.log(res);
    dispatch({
      type: ADD_PRODUCT,
      id: res.data.name,
      prod: prodObj,
    });
  };
};

export const editProduct = (id, prodObj) => {
  return {
    type: EDIT_PRODUCT,
    pid: id,
    prod: prodObj,
  };
};
