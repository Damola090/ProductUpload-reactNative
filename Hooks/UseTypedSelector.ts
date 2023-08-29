import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { RootState } from '../Redux/Store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


