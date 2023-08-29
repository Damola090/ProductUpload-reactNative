import { useContext } from 'react';
import * as React from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import { ColorConstants } from '../../../constants/Constants';

var { width } = Dimensions.get("window");

import { BigButtonProps } from '../types';

function BigButton({ children, whenPressed, style, buttonTextStyle }: BigButtonProps) {

    return (
        <View style={styles.ButtonContainer}>
            <Pressable
            onPress={whenPressed}
            style={({ pressed }) => 
                    pressed
                        ? [style, styles.pressed]
                        : style
        }
        android_ripple={{ color: 'red'}}
            >
                <View style={styles.innerContent}>
                    <Text style={[styles.innerText, buttonTextStyle]}>{children}</Text>
                </View>
            </Pressable>
        </View>


    )
}

export default BigButton;

const styles = StyleSheet.create({
    ButtonContainer: {
        margin: 5,
        borderRadius :  10,
        overflow: 'hidden',
    },
    innerContainer: {
        backgroundColor: ColorConstants.backgroundDeepPalette,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 5,
    },
    innerContent: {

    },
    innerText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.5
    }

})