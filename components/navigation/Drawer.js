import React from "react";
import ItemStackScreen from "./ItemStack";
import OrdersStackScreen from "./OrderStack";
import UserStackScreen from "./UserStack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerStyle="slide"
      drawerContentOptions={{ activeTintColor: "orange" }}
    >
      <Drawer.Screen
        name="Items"
        component={ItemStackScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="ios-list" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Order"
        component={OrdersStackScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="ios-cart" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="UserProducts"
        component={UserStackScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="ios-create" size={23} color={drawerConfig.color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
