import * as React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions  } from 'react-native';

import { AdminButtonProps } from '../types';
import { ColorConstants } from '../../../constants/Constants';


function AdminButton({ Buttonwidth, whenPressed, textStyle, backGroundStyle, children }: AdminButtonProps) {    
    
    return (
        <View style={[styles.OuterContainer, Buttonwidth]}>
            <Pressable
                onPress={whenPressed}
                style={({ pressed }) =>
                pressed
                ? [backGroundStyle, styles.pressed]
                : backGroundStyle
            }
            >
                <Text style={[styles.ButtonText, textStyle]}>{children}</Text>
            </Pressable>
        </View>
    )
}
export default AdminButton;

var deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    OuterContainer: {
        maxWidth : deviceWidth / 2,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: ColorConstants.backgroundDeepPalette
    },
    pressed: {
        opacity : 0.6

    },
    ButtonText: {
        color: ColorConstants.backgroundDeepPalette,
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})