import React from 'react'
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import Text from 'components/Text';
import Quantity from '../Quantity';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

type CartProductItemProps = {
    cartItem: CartItem;
}

const CartProductItem = ({ cartItem }: CartProductItemProps) => {
    const dispatch = useDispatch<Dispatch>()
    const [quantity, setQuantity] = React.useState<number>(cartItem.quantity)

    const onQuantityChange = (qty: number) => {
        const quantityUpdate = qty > quantity ? 1 : -1
        dispatch.cart.addToCart({ quantity: quantityUpdate, productId: cartItem.product._id })
        setQuantity(qty)
    }

    return <View style={styles.cartItemContainer}>
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.productItemImage}>
                <Image style={styles.productImage} resizeMode='contain' source={{ uri: cartItem.product.media.images[0].source }} />
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{cartItem.product.title}</Text>
                <Text
                    style={styles.productDescription}
                    numberOfLines={2}>
                    {cartItem.product.description || 'לא נימצא תיאור'}
                </Text>
            </View>
        </View>
        <View style={styles.productTotal}>
            <Text style={styles.productPrice}>{(cartItem.product.price * quantity).toFixed(2)}$</Text>
            <Quantity quantity={quantity} onQuantityChange={onQuantityChange} />
        </View>
    </View>
}

export default CartProductItem;


const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 10,
        justifyContent: 'flex-start',
        paddingHorizontal: 4,
        paddingVertical: 3,
    },
    productItemImage: {
        aspectRatio: 1,
        backgroundColor: '#e2f2fa',
        borderRadius: 8,
        alignItems: 'center',
        overflow: 'hidden',
    },
    productImage: {
        height: '100%',
        width: '100%'
    },
    productInfo: {
        alignItems: 'flex-start',
        marginHorizontal: 10
    },
    productTotal: {
        flex: 1,
        alignItems: 'flex-end'
    },
    productTitle: {
        color: '#000',
        fontSize: 14
    },
    productPrice: {
        color: '#000',
        fontSize: 12
    },
    productDescription: {
        color: '#939eaf',
        fontSize: 12,
        height: 30,
        marginTop: 2
    }
});

