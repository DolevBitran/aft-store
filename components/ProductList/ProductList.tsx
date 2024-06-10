import React from 'react'
import {
    StyleSheet,
    FlatList,
    Pressable,
    Platform,
    View,
    ActivityIndicator
} from 'react-native';
import ProductItem from 'components/ProductItem';
import { useDispatch } from 'react-redux';
import { Dispatch, store } from 'store/index';
import Text from '../Text';

type ProductListProps = {
    products: ProductData[]
    onEndReached?: (info: {
        distanceFromEnd: number;
    }) => void
}

const isRTL = store.getState().app.RTL

const ProductList = ({ onEndReached, products }: ProductListProps) => {
    const dispatch = useDispatch<Dispatch>()
    const onPress = (product: ProductData) => dispatch.app.navigateTo({ name: 'product', params: { id: product._id } })

    return (
        <FlatList
            style={styles.productList}
            contentContainerStyle={styles.rowStyles}
            data={products}
            renderItem={({ item: product }: { item: ProductData }) => <Pressable onPress={() => onPress(product)}>
                <ProductItem product={product} key={product.title} />
            </Pressable>}
            keyExtractor={(item, index) => item.title + index}
            horizontal
            showsHorizontalScrollIndicator={false}
            inverted={isRTL}
            initialScrollIndex={isRTL && Platform.OS !== 'web' ? Math.max(products.length - 1, 0) : 0}
            getItemLayout={(data, index) => (
                { length: 178, offset: 178 * index, index }
            )}
            // onViewableItemsChanged={ }
            // onScroll={e => console.log({ contentOffsetX: e.nativeEvent.contentOffset.x, contentWidth: e.nativeEvent.contentSize.width, layoutWidth: e.nativeEvent.layoutMeasurement.width, total: e.nativeEvent.layoutMeasurement.width - e.nativeEvent.contentOffset.x })}
            onEndReached={(info) => {
                console.log('onEndReached called!')
                onEndReached && onEndReached(info)
            }}
            onStartReachedThreshold={0.8}
            onEndReachedThreshold={0.1}
            maintainVisibleContentPosition={{
                minIndexForVisible: 0,
            }}
            ListEmptyComponent={<View style={styles.loaderWrapper}><ActivityIndicator size={70} color="#248dc2" /></View>}
        />
    )
}

export default ProductList;


const styles = StyleSheet.create({
    productList: {
        writingDirection: 'ltr',
        flexGrow: 2,
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: '7%',
    },
    rowStyles: {
    },
    loaderWrapper: {
        width: 150,
        height: 205,
        // backgroundColor: '#fff',
        // borderRadius: 8,
        marginHorizontal: 10,
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 3,
    }
});

