import React from 'react'
import {
    StyleSheet,
    FlatList,
    Pressable
} from 'react-native';
import ProductItem from 'components/ProductItem';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'store/index';

type ProductListProps = {
    products: ProductData[]
}

const ProductList = ({ products }: ProductListProps) => {
    const dispatch = useDispatch<Dispatch>()
    const onPress = (product: ProductData) => dispatch.app.navigateTo({ name: 'Product', params: { id: product.id } })

    return (
        <FlatList
            contentContainerStyle={styles.productList}
            data={products}
            renderItem={({ item: product }: { item: ProductData }) => <Pressable onPress={() => onPress(product)}>
                <ProductItem {...product} key={product.title} />
            </Pressable>}
            keyExtractor={item => item.title}
            horizontal
            showsHorizontalScrollIndicator={false} >
        </FlatList >
    )
}

export default ProductList;


const styles = StyleSheet.create({
    productList: {
        marginVertical: 10,
        paddingVertical: 20,
        paddingLeft: '7%',
    }
});

