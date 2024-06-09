import React from 'react'
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import Text from 'components/Text';

type ProductItemProps = {
    product: ProductData;
}

const ProductItem = ({ product }: ProductItemProps) => {

    return (
        <View style={styles.productItem}>
            <View style={styles.productItemImage}>
                <Image style={styles.amitImage} resizeMode='contain' source={{ uri: product.media.images[0].source }} />
            </View>
            <View style={styles.productInfo}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={styles.productTitle}>{product.title}</Text>
                    <Text style={styles.productPrice}>{product.price}$</Text>
                </View>
                <Text
                    style={styles.productDescription}
                    numberOfLines={2}>
                    {product.description || 'לא נימצא תיאור'}
                </Text>
            </View>
        </View >
    )
}

export default ProductItem;


const styles = StyleSheet.create({
    productItem: {
        width: 150,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 10,
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 3,
    },
    productItemImage: {
        aspectRatio: 1,
        width: '100%',
        backgroundColor: '#e2f2fa',
        borderRadius: 8,
        alignItems: 'center',
        overflow: 'hidden',
    },
    amitImage: {
        height: '100%',
        width: '100%'
    },
    productInfo: {
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

