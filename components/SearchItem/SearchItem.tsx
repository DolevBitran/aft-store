import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    ViewStyle
} from 'react-native';
import Text from 'components/Text';
import Quantity from '../Quantity';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

type SearchItemProps = {
    product: ProductData
    style?: ViewStyle
}

const SearchItem = ({ product, style = {} }: SearchItemProps) => {
    const dispatch = useDispatch<Dispatch>()


    return <View style={[styles.cartItemContainer, style]}>
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.productItemImage}>
                <Image style={styles.productImage} resizeMode='contain' source={{ uri: product.media.images[0].source }} />
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text
                    style={styles.productDescription}
                    numberOfLines={2}>
                    {product.description || 'לא נימצא תיאור'}
                </Text>
            </View>
        </View>
        <View style={styles.productTotal}>
            <Text style={styles.productPrice}>{(product.price).toFixed(2)}$</Text>
        </View>
    </View>
}

export default SearchItem;


const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 10,
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginVertical: 1,
        width: '100%'
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
        paddingHorizontal: 4,
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

