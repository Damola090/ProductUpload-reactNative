import * as React from 'react'
import { View, StyleSheet } from 'react-native';

type ContainerProps = {
    style?: object
    children: React.ReactNode

}

const ViewContainer = ({children, style} : ContainerProps ): JSX.Element => {

    return (
        <View style={[styles.viewContainer, style]}>
            {children}
        </View>
    )

}

export default ViewContainer;

const styles = StyleSheet.create({
    viewContainer : {
        flex : 1,
        paddingHorizontal : 10,
    }
})