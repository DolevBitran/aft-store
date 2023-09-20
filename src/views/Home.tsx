import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform
} from 'react-native';
import products from 'mock/products.json';
import { scale } from 'utils';
import Header from 'components/Header';
import ProductList from 'components/ProductList';
import Text from 'components/Text';

const Home = () => {

    const ListTitle = ({ title }: { title: string }) => <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', width: '86%', }}>
        <Text style={{ fontWeight: '600', fontSize: 24 }}>{title}</Text>
        <Text style={{ fontWeight: '500', fontSize: 14, color: 'gray' }}>See all</Text>
    </View>

    const HotSales = () => <>
        <ListTitle title="Hot Sales" />
        <ProductList products={products} />
    </>

    const RecentlyViewed = () => <>
        <ListTitle title="Recently Viewed" />
        <ProductList products={products} />
    </>

    return <ScrollView
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={Platform.OS === "web" ? undefined : [0]}
        style={[styles.container, { backgroundColor: '#fff' }]}>
        <Header />
        <View style={{ marginTop: 20 }}>
            <HotSales />
            <RecentlyViewed />
        </View>
    </ScrollView>
};

export default Home;

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