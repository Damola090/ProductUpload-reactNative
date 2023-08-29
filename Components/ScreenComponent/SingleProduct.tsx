import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../Hooks/UseTypedSelector";

import {
  deleteProduct,
  fetchAllProducts,
  updateProduct,
} from "../../Redux/action-creators/ProductActionCreator";

import Toast from "react-native-toast-message";

import LoadingOverlay from "../UI/LoadingOverlay";
import ViewContainer from "../../Container/ViewContainer";
import ProductInput from "../UI/Input/ProductInput";
import AdminButton from "../UI/Button/AdminButton";

import { ProductActionType } from "../../Redux/action-types/productActionType";
import { productDataType } from "./Types";

import { ColorConstants } from "../../constants/Constants";

interface ProductList {
  loading: Boolean;
  products: any[];
  error: String | null;
}

function SingleProduct() {
  //Set up Hooks
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  //Get All products stored in Redux State
  const { loading, products, error } = useTypedSelector<ProductList>(
    (state) => state.AllProducts
  );

  //Get Edited product stored in Redux State
  const { edit_loading, isDeleted, isUpdated, message, edit_error } =
    useTypedSelector<any>((state) => state.editProduct);

  const ProductId = route?.params?.productId;

  //fetch single product
  const singleProduct: productDataType = products.find(
    (product) => product._id === ProductId
  );

  const [productData, setProductData] = useState<productDataType>({
    name: singleProduct.name,
    price: singleProduct.price,
    description: singleProduct.description,
    stock: singleProduct.stock,
    images: singleProduct.images,
  });

  useEffect(() => {
    //Delete & Update Product SideEffect
    if (isDeleted === true && message !== null) {
      Toast.show({
        type: "success",
        text1: `${message}`,
        text2: "!!!!",
      });
      dispatch(fetchAllProducts());
      navigation.goBack();
      dispatch({
        type: ProductActionType.DELETE_PRODUCT_RESET,
      });
    }

    //Update Successfully
    if (isUpdated === true && message !== null) {
      Toast.show({
        type: "success",
        text1: `${message}`,
        text2: "!!!!",
      });
      dispatch({
        type: ProductActionType.UPDATE_PRODUCT_RESET,
      });
      dispatch(fetchAllProducts());
      navigation.goBack();
    }

    //Delete Failed
    if (isUpdated === false && edit_error !== null) {
      Toast.show({
        type: "error",
        text1: `${edit_error}`,
        text2: "Please Try again",
      });
      dispatch({
        type: ProductActionType.CLEAR_ERRORS,
      });
    }

    if (isDeleted === false && edit_error !== null) {
      Toast.show({
        type: "error",
        text1: `${edit_error}`,
        text2: "Please Try again",
      });
      dispatch({
        type: ProductActionType.CLEAR_ERRORS,
      });
    }
  }, [Toast, isUpdated, isDeleted, message, edit_error]);

  const DeleteHander = useCallback(() => {
    Alert.alert(
      "Delete Product",
      "Are You sure You want To Delete This Product",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => dispatch(deleteProduct(ProductId)) },
      ]
    );
  }, [ProductId]);

  const updateHander = useCallback(() => {
    Alert.alert(
      "Update Product",
      "Are You sure You want To Update This Product",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => dispatch(updateProduct(ProductId, productData)),
        },
      ]
    );
  }, [ProductId, productData]);

  if (edit_loading) {
    return (
      <LoadingOverlay />
    )
  }

  return (
    <>
        <View style={styles.ProductContainer}>
          <View style={styles.mainContainer}>
            <ScrollView>
              <View style={styles.ProductImageSection}>
                <Text style={styles.ImageHead}>Product Images</Text>
                <View style={styles.ImageContainer}></View>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={styles.ImageContainer}
                >
                  {productData.images.map((image) => (
                    <Image
                      key={image.url}
                      style={styles.ProductImage}
                      source={{ uri: image.url }}
                    />
                  ))}
                  <Image
                    style={styles.ProductImage}
                    source={{
                      uri: "https://res.cloudinary.com/dye0wqf1e/image/upload/c_scale,w_939/v1683946392/Goldland/dlpcddrvposuftoeuxso.jpg",
                    }}
                  />
                  <Image
                    style={styles.ProductImage}
                    source={{
                      uri: "https://res.cloudinary.com/dye0wqf1e/image/upload/c_scale,w_939/v1683946392/Goldland/dlpcddrvposuftoeuxso.jpg",
                    }}
                  />
                  <Image
                    style={styles.ProductImage}
                    source={{
                      uri: "https://res.cloudinary.com/dye0wqf1e/image/upload/c_scale,w_939/v1683946392/Goldland/dlpcddrvposuftoeuxso.jpg",
                    }}
                  />
                </ScrollView>
              </View>
              <ViewContainer>
                <View style={styles.ProductDetailsSection}>
                  <View style={styles.ProductDetailsRow}>
                    <Text style={styles.ProductDetailsKey}>Name</Text>
                    <ProductInput
                      style={styles.smallInputStyle}
                      textInputConfig={{
                        onChangeText: (editName) => {
                          setProductData({ ...productData, name: editName });
                        },
                        placeholder: "This is The Product Description",
                        value: productData.name,
                      }}
                    />
                  </View>
                  <View style={styles.ProductDetailsRow}>
                    <Text style={styles.ProductDetailsKey}>Price</Text>
                    <ProductInput
                      style={styles.smallInputStyle}
                      textInputConfig={{
                        onChangeText: (editPrice) => {
                          setProductData({ ...productData, price: editPrice });
                        },
                        placeholder: "This is The Product Description",
                        value: productData.price.toString(),
                      }}
                    />
                  </View>
                  <View style={styles.ProductDetailsRow}>
                    <Text style={styles.ProductDetailsKey}>Stock Quantity</Text>
                    <ProductInput
                      style={styles.smallInputStyle}
                      textInputConfig={{
                        onChangeText: (editStock) => {
                          setProductData({ ...productData, stock: editStock });
                        },
                        placeholder: "This is The Product Stock Level",
                        value: productData.stock.toString(),
                      }}
                    />
                  </View>
                </View>
                <View style={styles.ProductDescriptionSection}>
                  <Text style={styles.ProductDetailsKey}>Description</Text>
                  <View style={styles.ProductDescriptionContent}>
                    <ProductInput
                      containerStyle={styles.descriptionInput}
                      style={{
                        textAlign: "left",
                      }}
                      textInputConfig={{
                        onChangeText: (editDescription) => {
                          setProductData({
                            ...productData,
                            description: editDescription,
                          });
                        },
                        multiline: true,
                        placeholder: "This is The Product Description",
                        value: productData.description,
                      }}
                    />
                  </View>
                </View>
              </ViewContainer>
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              paddingVertical: 5,
            }}
          >
            <AdminButton
              Buttonwidth={styles.ButtonWidthStyle}
              textStyle={{ color: ColorConstants.backgroundDeepPalette }}
              backGroundStyle={{ backgroundColor: "white" }}
              whenPressed={DeleteHander}
            >
              Delete
            </AdminButton>
            <AdminButton
              Buttonwidth={styles.ButtonWidthStyle}
              textStyle={styles.ButtonTextStyle}
              backGroundStyle={styles.ButtonBackgroundStyle}
              whenPressed={updateHander}
            >
              Update
            </AdminButton>
          </View>
        </View>
    </>
  );
}

export default SingleProduct;

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  ProductContainer: {
    flex: 1,
  },
  mainContainer: {

  },
  ProductImageSection: {
    marginVertical: 10,
  },
  ImageHead: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
  },
  ImageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ProductImage: {
    width: 100,
    height: 200,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
  ProductDetailsSection: {
    marginBottom: 10,
  },
  ProductDetailsRow: {
    width: "100%",
    marginVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "green",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ProductDetailsRowOverwite: {
    marginVertical: 0,
    borderBottomWidth: 0,
  },
  ProductDetailsKey: {
    fontSize: 14,
    color: "#8F8F8F",
  },

  ProductDescriptionSection: {
    marginVertical: 14,
    flexDirection: "column",
  },
  descriptionInput: {
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: ColorConstants.backgroundLightPalette,
    height: deviceHeight / 5.3,
  },
  ProductDescriptionHead: {},
  ProductDescriptionContent: {},
  ProductDescriptionText: {
    textAlign: "left",
  },
  BottomSection: {
    backgroundColor: ColorConstants.backgroundDeepPalette,
  },
  ProductSlideShowSection: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionHead: {
    fontSize: 15,
    fontWeight: "600",
  },
  choseOptionContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "blue",
  },

  //my style
  smallInputStyle: {
    padding: 10,
    borderRadius: 10,
    textAlign: "right",
    width: "85%",
  },
  ButtonWidthStyle: {
    width: deviceWidth / 2 - 20.5,
    marginHorizontal: 5,
  },
  ButtonTextStyle: {
    color: ColorConstants.lightFont,
  },
  ButtonBackgroundStyle: {
    backgroundColor: ColorConstants.backgroundDeepPalette,
  },
});
