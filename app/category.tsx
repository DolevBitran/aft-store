import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform
} from 'react-native';
import { scale } from 'utils';
import Header from 'components/Header';
import ProductList from 'components/ProductList';
import Text from 'components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from 'store/index';
import { selectCategoriesProducts, selectCategoryById } from 'store/selectors/products.selector';
import ProductGrid from 'components/ProductList/ProductGrid';
import { useLocalSearchParams } from 'expo-router';

const Category = () => {
    const dispatch = useDispatch<Dispatch>()
    const { id } = useLocalSearchParams();
    // const categoryProducts = useSelector(selectProducts)
    const products = useSelector((state: iRootState) => selectCategoriesProducts(state, id as string))
    const category = useSelector((state: iRootState) => selectCategoryById(state, id as string))

    // React.useEffect(() => {
    //     if (id) {
    //         dispatch.products.fetchCategoryProducts(id)
    //     }
    // }, [id])

    const onEndReached = () => {
        console.log('onEndReached')
        // dispatch.products.appendProducts(products)
    }

    const ListTitle = ({ title }: { title: string }) => <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', width: '86%', }}>
        <Text style={{ fontWeight: '600', fontSize: 24 }}>{title}</Text>
        <Text style={{ fontWeight: '500', fontSize: 14, color: 'gray' }}>See all</Text>
    </View>

    const HotSales = () => <>
        <ListTitle title={category.title} />
        <ProductGrid onEndReached={onEndReached} products={products} />
    </>

    const RecentlyViewed = () => <>
        <ListTitle title="Recently Viewed" />
        <ProductList products={products} />
    </>

    if (!category) {
        console.log({ category, id })
        return null
    }

    return <ScrollView
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={Platform.OS === "web" ? undefined : [0]}
        style={[styles.container, { backgroundColor: '#fff' }]}>
        {/* <Header /> */}
        <View style={{ marginTop: 20, flexShrink: 2 }}>
            {/* <RecentlyViewed /> */}
            {/* <RecentlyViewed /> */}
            <HotSales />
        </View>
    </ScrollView>
};

export default Category;

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
    }
});