import React from 'react'
import {
    View,
    StyleSheet,
    TextStyle,
    ViewStyle,
    Platform
} from 'react-native';
import Text from 'components/Text';
import { Control, useController } from 'react-hook-form';
import { store } from 'store/index';
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';

type SelectDropdownPropsOmitted = Omit<SelectDropdownProps, "onSelect">

type ProductItemProps = SelectDropdownProps & {
    title: string
    name: string
    control: Control
    inputStyle?: TextStyle
    labelStyle?: TextStyle
    style?: ViewStyle
    placeholder: string
    data: SelectOption[]
    onSelect?: () => void
}

type SelectOption = {
    title: string
}

const SelectInput = ({ title, name, control, defaultValue, placeholder, data, onSelect, style = {}, inputStyle = {}, labelStyle = {}, ...props }: ProductItemProps) => {
    const { field } = useController({
        control,
        defaultValue: defaultValue || '',
        name
    })

    return (
        <View style={style}>
            <Text style={[styles.inputLabel, labelStyle]}>{title}</Text>
            <SelectDropdown
                data={data}
                defaultButtonText={placeholder}
                buttonStyle={styles.textInput}
                buttonTextStyle={styles.textInputInnerText}
                dropdownStyle={{
                    marginTop: 0,
                    borderRadius: 8,
                    height: 'auto',
                    maxHeight: 200
                }}
                rowStyle={{
                    paddingVertical: 5,
                    margin: 0,
                    height: 36,
                    borderBottomWidth: 0,
                    borderTopWidth: 0
                }}
                rowTextStyle={{
                    color: '#475a6e',
                    fontSize: 14,
                }}
                statusBarTranslucent
                dropdownOverlayColor={'transparent'}
                onSelect={(selectedItem, index) => {
                    field.onChange(selectedItem._id)
                    onSelect && onSelect(selectedItem, index)
                }}
                // buttonTextAfterSelection={(selectedItem, index) => {
                //     // text represented after item is selected
                //     // if data array is an array of objects then return selectedItem.property to render after item is selected
                //     console.log(selectedItem)
                //     return selectedItem
                // }}
                // rowTextForSelection={(item, index) => {
                //     // text represented for each item in dropdown
                //     // if data array is an array of objects then return item.property to represent item in dropdown
                //     return item
                // }}
                renderCustomizedRowChild={(selectedItem: SelectOption, index: number, isSelected?: boolean) => {
                    return <View style={{ height: 'auto', paddingHorizontal: 8 }}>
                        <Text style={{ color: '#475a6e' }}>{selectedItem.title}</Text>
                    </View>
                }}
                {...props}
            />
        </View>
    )
}

export default SelectInput;

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
        color: '#475a6e',
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
    },
    textInputInnerText: {
        height: 'auto',
        width: 'auto',
        verticalAlign: 'top',
        textAlign: 'auto',
        color: '#475a6e',
        fontSize: 18,
        padding: 0,
        writingDirection: isRTL ? 'rtl' : 'ltr',
        marginHorizontal: 0,
        paddingVertical: Platform.OS == 'web' ? 0 : 2,
    },
});

