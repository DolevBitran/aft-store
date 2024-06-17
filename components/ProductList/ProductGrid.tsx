import React from 'react'
import {
    StyleSheet,
    FlatList,
    Pressable,
    I18nManager,
    Platform,
    VirtualizedList,
    View
} from 'react-native';
import ProductItem from 'components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from 'store/index';

type ProductGridProps = {
    products: ProductData[]
    onEndReached?: (info: {
        distanceFromEnd: number;
    }) => void
}

const ProductGrid = ({ onEndReached, products }: ProductGridProps) => {
    const dispatch = useDispatch<Dispatch>()
    const onPress = (product: ProductData) => dispatch.app.navigateTo({ name: 'product', params: { id: product._id } })

    return (
        <FlatList
            initialNumToRender={products?.length || 0}
            nestedScrollEnabled
            style={styles.productGrid}
            contentContainerStyle={styles.gridStyles}
            data={products}
            renderItem={({ item: product }: { item: ProductData }) => <Pressable onPress={() => onPress(product)}>
                <ProductItem product={product} key={product._id} />
            </Pressable>}
            keyExtractor={(item, index) => item.title + index}
            initialScrollIndex={0}
            // onViewableItemsChanged={ }
            // onScroll={e => console.log({ contentOffsetX: e.nativeEvent.contentOffset.x, contentWidth: e.nativeEvent.contentSize.width, layoutWidth: e.nativeEvent.layoutMeasurement.width, total: e.nativeEvent.layoutMeasurement.width - e.nativeEvent.contentOffset.x })}
            onEndReached={(info) => {
                if (products.length >= 10) {
                    console.log('onEndReached called!', info)
                    onEndReached && onEndReached(info)
                }
            }}
            numColumns={2}
            onEndReachedThreshold={0.1}
            maintainVisibleContentPosition={{
                minIndexForVisible: 0,
            }}
        />
    )
}

export default ProductGrid;


const styles = StyleSheet.create({
    productGrid: {
        marginVertical: 10,
        paddingVertical: 20,
        // paddingHorizontal: '7%',
        writingDirection: 'rtl',
        flexGrow: 2,
        maxHeight: 400
    },
    gridStyles: {
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        rowGap: 12,
        alignItems: 'center',
    }
});

