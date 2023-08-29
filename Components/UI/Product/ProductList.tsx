import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductItem from './ProductItem';


import { useNavigation } from '@react-navigation/native';

import { productListProps } from '../types';

function ProductList({ products }: productListProps) {

    const navigation = useNavigation<any>();

    function RenderProductItem(itemData: any) {

        function pressHandler() {
            navigation.navigate('SingleProduct', {
                productId: itemData.item._id
            })
        }

        return (
            <ProductItem
                PImage={itemData.item.images[0].url}
                PName={itemData.item.name}
                PTag={itemData.item.price}
                PStock={itemData.item.stock}
                pressEvent={pressHandler}
            />
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={RenderProductItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default ProductList;



const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})
