import React from 'react'
import {
    StyleSheet,
    FlatList,
    Pressable,
    I18nManager,
    Platform
} from 'react-native';
import ProductItem from 'components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from 'store/index';
import { getProducts } from 'store/selectors/products.selector';

type ProductListProps = {
    products: ProductData[]
    onEndReached?: (info: {
        distanceFromEnd: number;
    }) => void
}

const isRTL = store.getState().app.RTL

const ProductList = ({ onEndReached, products }: ProductListProps) => {

    const dispatch = useDispatch<Dispatch>()
    const onPress = (product: ProductData) => dispatch.app.navigateTo({ name: 'Product', params: { id: product.id } })

    return (
        <FlatList
            // initialNumToRender={products.length}
            style={{ flex: 1, direction: 'ltr' }}
            contentContainerStyle={styles.productList}
            data={products}
            renderItem={({ item: product }: { item: ProductData }) => <Pressable onPress={() => onPress(product)}>
                <ProductItem {...product} key={product.title} />
            </Pressable>}
            keyExtractor={(item, index) => item.title + index}
            horizontal
            showsHorizontalScrollIndicator={false}
            // onEndReached={console.log}
            inverted={isRTL}
            initialScrollIndex={isRTL && Platform.OS !== 'web' ? products.length - 1 : 0}
            // onViewableItemsChanged={ }
            // onScroll={e => console.log({ contentOffsetX: e.nativeEvent.contentOffset.x, contentWidth: e.nativeEvent.contentSize.width, layoutWidth: e.nativeEvent.layoutMeasurement.width, total: e.nativeEvent.layoutMeasurement.width - e.nativeEvent.contentOffset.x })}
            onEndReached={(info) => {
                console.log('onEndReached called!')
                onEndReached && onEndReached(info)
            }}
            onEndReachedThreshold={0.1}
            maintainVisibleContentPosition={{
                minIndexForVisible: 0,
            }}
        >
        </FlatList >
    )
}

export default ProductList;


const styles = StyleSheet.create({
    productList: {
        writingDirection: 'rtl',
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: '7%',
    }
});

