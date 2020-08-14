import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import OrderItem from "../../components/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.order.orders);
  props.navigation.setOptions({
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
          title="Menu"
        />
      </HeaderButtons>
    ),
  });
  return (
    <FlatList
      keyExtractor={(ele) => ele.id}
      data={orders}
      renderItem={(itemData) => <OrderItem order={itemData.item} />}
    />
  );
};

export default OrdersScreen;
