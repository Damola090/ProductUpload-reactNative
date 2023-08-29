export interface AdminButtonProps {
    Buttonwidth?: any
    whenPressed: () => void
    textStyle: object
    backGroundStyle?: object
    children: React.ReactNode
}

export interface BigButtonProps {
    children: React.ReactNode
    whenPressed: () => void
    style?: object
    buttonTextStyle?: object
}

export interface ProductInputProps {
    containerStyle?: object
    style?: object
    textInputConfig: {
        onFocus?: () => void
        onBlur?: () => void
        onChangeText?: (arg: any) => void | any,
        onEndEditing?: () => void
        placeholder: String | any,
        multiline?: Boolean | any,
        value: any
    }
}

export interface ProductItemProps {
    PImage: String | any
    PName: String
    PStock: String
    PTag: String
    pressEvent: () => void
}

export interface productListProps {
    products: any[]
}

export interface loadingProps {
    uploading?: boolean;
  }
  