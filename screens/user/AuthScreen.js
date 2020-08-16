import React, { useState, useReducer, useCallback } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import taj from "../../assets/taj.jpg";
import { useSelector, useDispatch } from "react-redux";
import { signUp, logIn } from "../../store/actions/auth";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
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
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = ({ navigation }) => {
  const [loginMode, setLoginMode] = useState(false);
  const [load, setLoad] = useState(false);
  navigation.setOptions({
    title: loginMode ? "LogIn" : "SignUp",
  });

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  const textChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      formDispatch({
        type: "FORM_INPUT_UPDATE",
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [formDispatch]
  );

  const signUpHandler = async () => {
    setLoad(true);
    if (loginMode) {
      await dispatch(
        logIn(formState.inputValues.email, formState.inputValues.password)
      );
    } else {
      await dispatch(
        signUp(formState.inputValues.email, formState.inputValues.password)
      );
    }
    setLoad(false);
  };

  return (
    <ImageBackground source={taj} style={styles.backgroundImg}>
      <KeyboardAvoidingView style={styles.screen}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={textChangeHandler}
              initialValue=""
              placeholder="Email"
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={textChangeHandler}
              initialValue=""
              placeholder="Password"
            />
            {load && (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator color="dodgerblue" size="large" />
              </View>
            )}
            <View style={styles.btnContainer}>
              <Button
                title={loginMode ? "Login" : "SignUp"}
                disabled={!formState.formIsValid}
                onPress={signUpHandler}
              />
              {loginMode ? (
                <Button
                  title="SignUp Instead"
                  onPress={() => setLoginMode(false)}
                />
              ) : (
                <Button
                  title="Login Instead"
                  onPress={() => setLoginMode(true)}
                />
              )}
            </View>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    width: "80%",
    height: "35%",
    padding: 20,
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
