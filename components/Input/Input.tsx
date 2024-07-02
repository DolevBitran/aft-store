import React from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    ViewStyle
} from 'react-native';
import Text from 'components/Text';
import { Control, useController } from 'react-hook-form';
import { store } from 'store/index';
import { WEIGHTS } from '../Text/Text';

type ProductItemProps = {
    title?: string
    name: string
    control: Control
    inputStyle?: TextStyle
    labelStyle?: TextStyle
    style?: ViewStyle
    forwardedRef?: React.RefObject<TextInput | undefined>
} & TextInputProps

const Input = ({ title, name, control, defaultValue, style = {}, inputStyle = {}, labelStyle = {}, forwardedRef, ...props }: ProductItemProps) => {
    const { field } = useController({
        control,
        defaultValue: defaultValue || '',
        name
    })

    const { fontWeight } = inputStyle || {}
    const textStyles: TextStyle = {}
    // @ts-ignore
    textStyles.fontFamily = fontWeight ? `Rubik-${WEIGHTS[fontWeight]}` : 'Rubik'
    return (
        <View style={style}>
            {title && <Text style={[styles.inputLabel, labelStyle, textStyles]}>{title}</Text>}
            <TextInput
                ref={el => forwardedRef && (forwardedRef.current = el as TextInput)}
                value={field.value}
                style={[textStyles, styles.textInput, inputStyle]}
                onChangeText={field.onChange}
                placeholderTextColor={'#475a6e'}
                {...props} />
        </View>
    )
}

export default Input;

const isRTL = store.getState().app.RTL

const styles = StyleSheet.create({
    inputLabel: {
        fontSize: 20,
        fontWeight: '500'
    },
    textInput: {
        writingDirection: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
        backgroundColor: 'transparent',
        verticalAlign: 'top',
        marginTop: 4,
        borderColor: '#e0e6ee',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 4,
        fontSize: 18,
        height: 'auto',
        width: 'auto',
        // @ts-ignore
        outlineStyle: 'none',
        color: '#475a6e',
    },
});

