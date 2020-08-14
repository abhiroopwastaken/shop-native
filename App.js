import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import ProductReducer from "./store/reducers/products";
import CartReducer from "./store/reducers/cart";
import OrderReducer from "./store/reducers/orders";

import { NavigationContainer } from "@react-navigation/native";

// Importing Stack Navigator
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importing Screens
import CartScreen from "./screens/shop/CartScreen";
import OrdersScreen from "./screens/shop/OrdersScreen";
import ProductDetailScreen from "./screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";
import UserProductsScreen from "./screens/user/UserProductsScreen";
import EditProductScreen from "./screens/user/EditProductScreen";

import { composeWithDevTools } from "redux-devtools-extension";

import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const OrderStack = createStackNavigator();
const UserStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  order: OrderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
};

const ItemStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductOverview"
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ProductOverview"
        component={ProductsOverviewScreen}
        options={{
          title: "All Products",
        }}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

const OrdersStackScreen = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
        headerTitle: "Your Orders",
      }}
    >
      <OrderStack.Screen name="Orders" component={OrdersScreen} />
    </OrderStack.Navigator>
  );
};

const UserStackScreen = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
        headerTitle: "Your Products",
      }}
    >
      <UserStack.Screen name="UserProducts" component={UserProductsScreen} />
      <UserStack.Screen
        name="EditProducts"
        component={EditProductScreen}
        options={{
          headerTitle: "Edit Product",
        }}
      />
    </UserStack.Navigator>
  );
};

export default function App() {
  const [load, isLoad] = useState(false);
  if (!load) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => isLoad(true)} />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerStyle="slide"
          drawerContentOptions={{ activeTintColor: "orange" }}
        >
          <Drawer.Screen
            name="Items"
            component={ItemStackScreen}
            options={{
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name="ios-list"
                  size={23}
                  color={drawerConfig.color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Order"
            component={OrdersStackScreen}
            options={{
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name="ios-cart"
                  size={23}
                  color={drawerConfig.color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="UserProducts"
            component={UserStackScreen}
            options={{
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name="ios-create"
                  size={23}
                  color={drawerConfig.color}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
