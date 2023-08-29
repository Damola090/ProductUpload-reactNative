import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../Hooks/UseTypedSelector';

import { fetchAllProducts } from '../Redux/action-creators/ProductActionCreator';
import LoadingOverlay from '../Components/UI/LoadingOverlay';
import DashBoard from '../Components/ScreenComponent/DashBoard';

function DashBoardScreen() {

    const dispatch = useDispatch<any>()
    const { loading } = useTypedSelector(state => state.AllProducts)

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllProducts())
        }, [])
    )

    if (loading) {
        return <LoadingOverlay />
    }

    return (
        <DashBoard />
    )
}

export default DashBoardScreen;
