import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/order";
import uuid from "react-native-uuid";
import moment from "moment";

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const id = uuid.v4();
      const newOrder = new Order(
        id,
        action.payload.cartItems,
        action.payload.totalAmount,
        moment(new Date()).format("MMMM Do YYYY")
      );
      return {
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};

export default reducer;
