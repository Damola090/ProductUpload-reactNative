import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashBoardScreen from "../Screens/DashBoardScreen";
import AllProductScreen from "../Screens/AllProductScreen";
import SingleProductScreen from "../Screens/SingleProductScreen";
import CreateProductScreen from "../Screens/CreateProduct";

export type TopStackParamList = {
  Dashboard: undefined;
  createProduct: undefined
  AllProducts: undefined;
  SingleProduct: undefined;
};

const Stack = createNativeStackNavigator<TopStackParamList>();

function MyStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard"
        component={DashBoardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="createProduct"
        component={CreateProductScreen}
        options={{
          title: 'Create A New Product'
        }}
      />
       <Stack.Screen 
        name="AllProducts"
        component={AllProductScreen}
        options={{
          title: 'All Products'
        }}
      />
      <Stack.Screen 
        name="SingleProduct"
        component={SingleProductScreen}
        options={{
          title: 'Product'
        }}
      />
    </Stack.Navigator>
  );
}

function Main() {

  return <MyStack />;
}

export default Main;
