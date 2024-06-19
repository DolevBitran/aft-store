import React from 'react'
import {
    View,
    StyleSheet,
    Pressable,
} from 'react-native';
import Text from 'components/Text';


type QuantityProps = {
    quantity: number,
    onQuantityChange(quantity: number,): void
}


const Quantity = ({ quantity, onQuantityChange }: QuantityProps) => {
    const isDisabled = quantity === 1
    const disabledStyle = { backgroundColor: isDisabled ? 'gray' : '#0673e8' }

    return <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Pressable role="button" disabled={isDisabled} onPress={() => onQuantityChange(quantity - 1)} style={[styles.quantityButton, disabledStyle]}>
            <Text style={{ fontSize: 16, color: "#fff" }}>-</Text>
        </Pressable>
        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>{quantity}</Text>
        <Pressable role="button" onPress={() => onQuantityChange(quantity + 1)} style={styles.quantityButton}>
            <Text style={{ fontSize: 16, color: "#fff" }}>+</Text>
        </Pressable>
    </View >
}

export default Quantity;


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#7073da',
        borderRadius: 14,
        marginHorizontal: '8%',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    cardBody: {
        marginTop: 20,
    },
    quantityButton: {
        backgroundColor: '#0673e8',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        margin: 0
    }
});

