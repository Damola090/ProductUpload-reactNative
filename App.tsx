import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from './Redux/Store';


import Main from './Navigators/Main';

import Toast from "react-native-toast-message";
import { fetchAllProducts } from './Redux/action-creators/ProductActionCreator';



export default function App() {

  useEffect(() => {
    store.dispatch<any>(fetchAllProducts());
  }, [store, fetchAllProducts]);
  
  return (
    <Provider store={store}>
    <NavigationContainer>
        <Main />
        <Toast position="bottom" bottomOffset={20} />
    </NavigationContainer>
    </Provider>
  );
}

