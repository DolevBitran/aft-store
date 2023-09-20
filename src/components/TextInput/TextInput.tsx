import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    TextInput as Input,
    TextInputProps
} from 'react-native';
import Text from 'components/Text';
import { Control, useController } from 'react-hook-form';

type ProductItemProps = {
    name: string
    control: Control
} & TextInputProps

const TextInput = ({ name, control, defaultValue, ...props }: ProductItemProps) => {
    const { field } = useController({
        control,
        defaultValue: defaultValue || '',
        name
    })

    return (
        <Input
            value={field.value}
            style={styles.textInput}
            onChangeText={field.onChange}
            {...props} />
    )
}

export default TextInput;

const styles = StyleSheet.create({
    textInput: {
        outlineStyle: 'none',
        verticalAlign: 'top',
        color: '#475a6e',
        marginTop: 4,
        fontSize: 14,
        borderColor: '#e0e6ee',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 2,
        paddingTop: 6,
    },
});

