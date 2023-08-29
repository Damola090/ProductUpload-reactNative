import { View, Text, StyleSheet, TextInput } from 'react-native';

import { ProductInputProps } from '../types';

const ProductInput = ({ containerStyle, style, textInputConfig }: ProductInputProps) => {

    return (
        <View style={[styles.InputContainer, containerStyle]}>
            <TextInput style={[styles.Input, style]} { ...textInputConfig}  />
        </View>
    )
}

export default ProductInput;

const styles = StyleSheet.create({
    InputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    Input: {

    },
})