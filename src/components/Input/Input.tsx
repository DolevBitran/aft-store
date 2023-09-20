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

type ProductItemProps = {
    title: string
    name: string
    control: Control
    inputStyle?: TextStyle
    labelStyle?: TextStyle
    style?: ViewStyle
} & TextInputProps

const Input = ({ title, name, control, defaultValue, style = {}, inputStyle = {}, labelStyle = {}, ...props }: ProductItemProps) => {
    const { field } = useController({
        control,
        defaultValue: defaultValue || '',
        name
    })

    return (
        <View style={style}>
            <Text style={[styles.inputLabel, labelStyle]}>{title}</Text>
            <TextInput
                value={field.value}
                style={[styles.textInput, inputStyle]}
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
        outlineStyle: 'none',
        color: '#475a6e',
    },
});

