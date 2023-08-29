import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

import { ProductItemProps } from '../types';


function ProductItem({ PImage, PName, PStock, PTag, pressEvent }: ProductItemProps) {
    
    return (
        <Pressable
            onPress={pressEvent}
        >
            <View style={styles.ItemContainer}>
                <Image
                    style={{ borderRadius: 10, width: 50, height: 50 }}
                    source={{ uri: PImage }}
                />
                <View style={styles.InnerContainer}>
                    <Text style={styles.ProductName}>{PName}</Text>
                    <Text style={styles.ProductStock}>{PStock} in Stock</Text>
                </View>
                <View style={styles.PriceContainer}>
                    <Text style={styles.PriceTag}>₦{PTag}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ProductItem;

const styles = StyleSheet.create({
    ItemContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10

    },
    ItemImage: {
        borderRadius: 10,
        width: 50,
        height: 50,
    },
    InnerContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    ProductName: {
        fontSize: 16,
        fontWeight: '500'

    },
    ProductStock: {

    },
    PriceContainer: {

    },
    PriceTag: {
        fontWeight: '600'

    }

})


