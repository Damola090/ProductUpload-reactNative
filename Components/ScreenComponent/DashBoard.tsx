import { View, Text, Pressable, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTypedSelector } from "../../Hooks/UseTypedSelector";

import ViewContainer from "../../Container/ViewContainer";
import BigButton from "../UI/Button/BigButton";

import { ColorConstants } from "../../constants/Constants";

function DashBoard() {
  const navigation = useNavigation<any>();
  const { products } = useTypedSelector<any>((state) => state.AllProducts);

  const createProductButtonStyle = {...styles.buttonStyle, backgroundColor: products.length === 5 ? ColorConstants.backgroundLightPalette: ColorConstants.backgroundDeepPalette }

  function AllProductsNavigator() {
    navigation.navigate("AllProducts");
  }

  function CreateProductNavigator() {
    if (products.length === 5) {
      return
    }

    navigation.navigate("createProduct");
  }

  return (
    <>
      <ViewContainer style={styles.container}>
        <View style={styles.innerContainer}>
        <View style={styles.productContainer}>
          <Pressable
            onPress={() => navigation.navigate("ProductList")}
            style={[styles.Box, { backgroundColor: ColorConstants.backgroundLightPalette }]}
          >
            <Text style={styles.boxText}>Products</Text>
            <Text style={styles.boxText}>{products.length}</Text>
          </Pressable>
        </View>
        <View style={styles.quickActionContainer}>
          <BigButton
            style={styles.buttonStyle}
            buttonTextStyle={styles.buttonText}
            whenPressed={AllProductsNavigator}
          >
            All Products
          </BigButton>
          <BigButton
            style={createProductButtonStyle}
            buttonTextStyle={styles.buttonText}
            whenPressed={CreateProductNavigator}
          >
            Create Product
          </BigButton>
          <BigButton
            style={styles.buttonStyle}
            buttonTextStyle={styles.buttonText}
            whenPressed={AllProductsNavigator}
          >
            Update Product
          </BigButton>
          <BigButton
            style={styles.buttonStyle}
            buttonTextStyle={styles.buttonText}
            whenPressed={AllProductsNavigator}
          >
            Delete Product
          </BigButton>
        </View>
        {products.length === 5 && (
          <View style={styles.maximumBox}>
            <Text style={styles.maximumText}>
              Maximum Number of Products Added
            </Text>
          </View>
        )}
        </View>
      </ViewContainer>
    </>
  );
}

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: ColorConstants.backgroundMedium,
  },
  productContainer: {
    alignItems: "center",
  },
  Box: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: 150,
    height: 150,
  },
  boxText: {
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 3,
  },
  quickActionContainer: {
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: ColorConstants.backgroundDeepPalette,
    paddingVertical: 8,
    paddingHorizontal: 30,
    elevation: 5,
  },
  buttonText: {
    color: "white",
  },
  maximumBox: {
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorConstants.backgroundLightPalette,
  },
  maximumText: {
    fontSize: 18,
    fontWeight: "400",
    color: ColorConstants.darkFont
  },
});
