import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform,
    Pressable,
    Image
} from 'react-native';
import Text from 'components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'store/index';
import { useLocalSearchParams } from 'expo-router';
import i18n from '@/utils/i18n';
import { selectCartArray } from '@/store/selectors/cart.selector';
import Quantity from '@/components/Quantity';
import CartProductItem from '@/components/CartProductItem';

const Cart = () => {
    const dispatch = useDispatch<Dispatch>()
    const cart = useSelector(selectCartArray)

    React.useEffect(() => {
        if (cart && !cart.length) {
            dispatch.cart.resetCart()
        }
        dispatch.cart.fetchCart()
    }, [])

    React.useEffect(() => {
        console.log({ cart })
    }, [cart])

    if (!cart) {
        return <View style={[styles.container, { backgroundColor: '#fff' }]}>
            <Text>
                Loading
            </Text>
        </View>
    }

    if (!cart.length) {
        return <View style={[styles.container, { backgroundColor: '#fff' }]}>
            <Text>
                Cart is Empty
            </Text>
        </View>
    }

    return <>
        <ScrollView
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={Platform.OS === "web" ? undefined : [0]}
            style={[styles.container, { backgroundColor: '#fff' }]}>
            <View style={{ marginTop: 20, flexShrink: 2 }}>
                {cart.map(cartItem => <CartProductItem cartItem={cartItem} key={cartItem._id} />)}
            </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', padding: 20, backgroundColor: '#f2f2f2' }}>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Pressable onPress={() => { }} role="button" style={{ backgroundColor: '#0673e8', borderRadius: 4, paddingVertical: 4, paddingHorizontal: 8, margin: 0 }}>
                    <Text style={{ fontSize: 16, color: "#fff" }}>{i18n.translate('cart.checkout')}</Text>
                </Pressable>
            </View >
        </View >
    </>
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    listTitle: {
        fontWeight: '600',
        fontSize: 18
    },

});