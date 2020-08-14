import React, { useState, useReducer } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../store/actions/products";
import Input from "../../components/Input";

const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      if (!updatedValidities[key]) {
        updatedFormIsValid = false;
      }
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = ({ route, navigation }) => {
  let userProduct;

  const dispatch = useDispatch();

  if (route.params.id !== "none") {
    const id = route.params.id;
    userProduct = useSelector((state) =>
      state.products.userProducts.find((ele) => ele.id === id)
    );
  }

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: route.params.id !== "none" ? userProduct.title : "",
      img: route.params.id !== "none" ? userProduct.imageUrl : "",
      price:
        route.params.id !== "none"
          ? (parseInt(userProduct.price) * 20).toString()
          : "",
      desc: route.params.id !== "none" ? userProduct.description : "",
    },
    inputValidities: {
      title: route.params.id !== "none" ? true : false,
      img: route.params.id !== "none" ? true : false,
      price: route.params.id !== "none" ? true : false,
      desc: route.params.id !== "none" ? true : false,
    },
    formIsValid: route.params.id !== "none" ? true : false,
  });

  navigation.setOptions({
    headerTitle: route.params.id !== "none" ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-checkmark"
          onPress={() => {
            submitHandler(route.params.id);
          }}
          title="Create"
          disabled={!formState.formIsValid}
        />
      </HeaderButtons>
    ),
  });

  const submitHandler = (id) => {
    const userProduct = {
      title: formState.inputValues.title,
      img: formState.inputValues.img,
      desc: formState.inputValues.desc,
    };
    const availProduct = {
      title: formState.inputValues.title,
      img: formState.inputValues.img,
      price: formState.inputValues.price,
      desc: formState.inputValues.desc,
    };
    if (id !== "none") {
      dispatch(editProduct(id, userProduct));
    } else {
      dispatch(addProduct(availProduct));
    }
    navigation.navigate("UserProducts");
  };

  const textChangeHandler = (text, input) => {
    let isValid = true;
    if (text.trim().length === 0) {
      isValid = false;
    }
    formDispatch({ type: "UPDATE", value: text, isValid, input });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          state={formState}
          textChange={textChangeHandler}
          identifier="title"
          heading="Title"
          keyboard="default"
        />
        <Input
          state={formState}
          textChange={textChangeHandler}
          heading="Image URL"
          identifier="img"
          keyboard="default"
        />
        {!userProduct && (
          <Input
            state={formState}
            textChange={textChangeHandler}
            identifier="price"
            heading="Price"
            keyboard="numeric"
          />
        )}
        <Input
          state={formState}
          textChange={textChangeHandler}
          identifier="desc"
          heading="Description"
          keyboard="default"
        />
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
