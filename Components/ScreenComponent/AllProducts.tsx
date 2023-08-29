import { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../Hooks/UseTypedSelector";

import { fetchAllProducts } from "../../Redux/action-creators/ProductActionCreator";

import LoadingOverlay from "../UI/LoadingOverlay";
import ProductList from "../UI/Product/ProductList";

import { ColorConstants } from "../../constants/Constants";


function AllProducts() {
  const dispatch = useDispatch<any>();
  const { loading, products, error } = useTypedSelector<any>(
    (state) => state.AllProducts
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllProducts());
    }, [])
  );

  if (loading) {
    return <LoadingOverlay />
  }

  
  return (
    
        <View style={styles.container}>
          {products.length !== 0 && <ProductList products={products} />}
          
          {products.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text>No Products Yet.. Please Create one</Text>
            </View>
          )}
        </View>
  );
}

export default AllProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
