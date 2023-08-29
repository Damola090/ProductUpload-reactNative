import { useState, useEffect, useCallback } from 'react';
import { View, Text, Alert, ScrollView, Pressable, Image, StyleSheet } from 'react-native';

import BigButton from '../UI/Button/BigButton';

import { Ionicons } from "@expo/vector-icons";

//imagepicker
import * as ImagePicker from "expo-image-picker";

import ProductInput from '../UI/Input/ProductInput';

import { productDataType } from './Types';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/UseTypedSelector';

import { ProductActionType } from '../../Redux/action-types/productActionType';

import { 
  uploadPicture,
  clearErrors,
  createProduct, 
  fetchAllProducts
} from '../../Redux/action-creators/ProductActionCreator';

import Toast from "react-native-toast-message";
import LoadingOverlay from '../UI/LoadingOverlay';
import { useNavigation } from '@react-navigation/native';

import { ColorConstants } from '../../constants/Constants';


function CreateProduct() {

  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();

  const [ProductImages, setProductImages] = useState<any[]>([]);

  const [productData, setProductData] = useState<productDataType>({
    name: "",
    price: 0,
    description: "",
    stock: 0, 
    images: [],
  });

  const { upload_loading, upload_links, upload_success, upload_error } =
    useTypedSelector((state) => state.uploadPicture);

  const { loading, newProduct, success, error } = useTypedSelector(
    (state) => state.createProduct
  );
  
  
//Request Permission to use Image library
const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

//Function to Request for permission
async function VerifyPermission() {
   const permissionResponse =
     await ImagePicker.getMediaLibraryPermissionsAsync();

   if (permissionResponse.status === "undetermined") {
     const permission = await requestPermission();

     return permission.granted;
   }

   if (permissionResponse.status === "denied") {
     Alert.alert(
       "Insufficient Permission",
       "You need to grand Photo library permission to Add Product Images"
     );

     return false;
   }

   return true;
}


 //function to launch Image library
 async function LaunchImageLibrary() {
   const weHavePermission = await VerifyPermission();

   if (!weHavePermission) {
     return;
   }

   const response: any = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
   });

   if (!response.canceled) {
    setProductImages([...ProductImages, response.assets[0].uri]);
  }
}


useEffect(() => {
  //Side effect for product created
  if (error) {
    dispatch(clearErrors());
    Toast.show({
      type: "error",
      text1: `${error}`,
      text2: "Failed to create Product",
    });
  }

  if (success) {

    dispatch({
      type: ProductActionType.NEW_PRODUCT_RESET,
    });

    dispatch({
      type: ProductActionType.UPLOAD_PICTURE_RESET,
    });

    setProductData({
      ...productData,
      name: "",
      price: 0,
      description: "",
      stock: 0,
      images: [],
    });

    setProductImages([])

    Toast.show({
      type: "success",
      text1: "Product created Successfully",
    });
  }
}, [error, success]);

useEffect(() => {
  //side effect for imges uploaded to cloud
  if (upload_error) {
    dispatch(clearErrors());
    setProductData({ ...productData, images: [] });
    Toast.show({
      type: "error",
      text1: `${upload_error}`,
      text2: "Please Try again",
    });
  }

  if (upload_success) {
    setProductData({ ...productData, images: upload_links });
    Toast.show({
      type: "success",
      text1: "Images Uploaded Successfully",
    });
    dispatch({
      type: ProductActionType.UPLOAD_PICTURE_RESET,
    });
  }

  return () => {};
}, [upload_error, upload_success]);


const UploadImages = useCallback(async () => {
  await UploadToCloudinary();
}, [ProductImages]);


async function UploadToCloudinary() {
  const formData: any = new FormData();

  ProductImages.forEach((image) => {
    formData.append("image", {
      name: new Date() + "_profile",
      uri: image,
      type: "image/jpg",
    });
  });

  dispatch(uploadPicture(formData));
}

  function SubmitHandler() {

    if (!productData.name || typeof productData.name !== 'string') {

      Toast.show({
        type: "error",
        text1: "Please Type In Product Name",
        text2: "Product Failed to be created",
      });

      return;

    } else if (!productData.price || typeof productData.price !== 'number') {

      Toast.show({
        type: "error",
        text2: "Please Type In Product Price",
        text1: "Product Failed to be created",
      });

      return;

    } else if (!productData.description || typeof productData.description !== 'string') {

      Toast.show({
        type: "error",
        text1: "Please Type In Product Description",
        text2: "Product Failed to be created",
      });

      return;

    } else if (!productData.stock || typeof productData.stock !== 'number') {

      Toast.show({
        type: "error",
        text1: "Please Type In Stock Level",
        text2: "Product Failed to be created",
      });

      return;

    } else if (productData.images.length === 0) {

      Toast.show({
        type: "error",
        text1: "Please Upload a Picture First",
        text2: "Product Failed to be created",
      });

      return;
    } 
    dispatch(createProduct(productData));
    dispatch(fetchAllProducts());
  }


    return (
      <>
      {upload_loading || loading 
        ? <LoadingOverlay uploading={true} />
        : (
          <View style={styles.FormContainer}>
          <ScrollView>
            <Text style={styles.HeadText}>Product Images</Text>
            <View style={styles.ImageSectionRowOne}>
              <View style={styles.AddImage}>
                <Pressable onPress={LaunchImageLibrary}>
                  <Ionicons name="add-sharp" size={24} color="black" />
                </Pressable>
              </View>
              <ScrollView horizontal={true}>
                {ProductImages.map((image: any, index: any) => (
                  <Image
                    key={image}
                    style={{ width: 150, height: 200, marginHorizontal: 5 }}
                    source={{ uri: image }}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={{ marginTop: 20 }}>
              <BigButton 
              style={styles.buttonStyle} 
              buttonTextStyle={{ color: ColorConstants.lightFont}}
              whenPressed={UploadImages}
              >
                Upload - Images
              </BigButton>
            </View>
            <View style={styles.FormContent}>
              <View style={styles.ProductDetailsRow}>
                <Text style={styles.ProductDetailsKey}>Name</Text>
                <ProductInput
                  style={styles.smallInputStyle}
                  textInputConfig={{
                    onChangeText: (product) => {
                      setProductData({ ...productData, name: product });
                    },
                    placeholder: "Name of Product",
                    value: productData.name,
                  }}
                />
              </View>
              <View style={styles.ProductDetailsRow}>
                <Text style={styles.ProductDetailsKey}>price</Text>
                <ProductInput
                  style={styles.smallInputStyle}
                  textInputConfig={{
                    onChangeText: (price) => {
                      setProductData({
                        ...productData,
                        price: parseInt(price),
                      });
                    },
                    placeholder: "price of Product",
                    value: productData.price,
                  }}
                />
              </View>
              <View style={styles.ProductDetailsRow}>
                <Text style={styles.ProductDetailsKey}>Quantity</Text>
                <ProductInput
                  style={styles.smallInputStyle}
                  textInputConfig={{
                    onChangeText: (qty) => {
                      setProductData({
                        ...productData,
                        stock: parseInt(qty),
                      });
                    },
                    placeholder: "stock Quantity",
                    value: productData.stock,
                  }}
                />
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
                      onChangeText: (description) => {
                        setProductData({
                          ...productData,
                          description: description,
                        });
                      },
                      multiline: true,
                      placeholder: "This is The Product Description",
                      value: productData.description,
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.BottomContainer}>
            <BigButton 
              style={styles.buttonStyle} 
              whenPressed={SubmitHandler}
              buttonTextStyle={{ color: ColorConstants.lightFont}}
              >
              Save Product
            </BigButton>
          </View>
        </View>
      )}
      </>
    )
}

export default CreateProduct;


const styles = StyleSheet.create({
    FormContainer: {
      flex: 1,
      margin: 5,
      padding: 10,
    },
    HeadText: {
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 5,
    },
    ImageSectionRowOne: {
      flexDirection: "row",
      justifyContent: "space-between",
     
    },
    ImageSectionRowTwo: {
      flexDirection: "row",
      marginVertical: 5,
      width: "100%",
     
    },
    AddImage: {
      height: 100,
      padding: 30,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "green",
      marginRight: 10,
      backgroundColor: "#D3E4DE",
    },
    ImagesContainer: {
      flexDirection: "row",
      justifyContent: "center",
      // backgroundColor: 'blue'
    },
    FormContent: {
      flexDirection: "column",
      // justifyContent: 'flex-end',
      height: "80%",
      // backgroundColor: 'red',
      marginTop: 5,
    },
    Quantity: {
      flexDirection: "row",
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
    smallInputStyle: {
      padding: 10,
      borderRadius: 10,
      textAlign: "right",
      width: "85%",
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
      height: 200,

    },
    ProductDescriptionContent: {},
    PickerContainer: {
      backgroundColor: "blue",
    },
    Seller: {
      backgroundColor: "red",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    BottomContainer: {
      justifyContent: "flex-end",
      // backgroundColor: 'red'
    },
    buttonStyle: {
      backgroundColor: "green",
      paddingVertical: 8,
      paddingHorizontal: 30,
      elevation: 5,
    },
  
    //-----------------------
    dropDownButton: {
      backgroundColor: "grey",
      borderRadius: 10,
    },
    dropdownView: {
      borderRadius: 10,
    },
  });
  