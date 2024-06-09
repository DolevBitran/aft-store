import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform,
    ViewStyle,
    Dimensions
} from 'react-native';
import { scale } from 'utils';
import Header from 'components/Header';
import ProductList from 'components/ProductList';
import Text from 'components/Text';
import { useRoute } from '@react-navigation/native';
import AnimatedView, { useSpring } from 'components/AnimatedView';
import SkeletonItem from 'components/SkeletonItem';


const wWidth = Dimensions.get('window').width

const Product = () => {
    const route = useRoute()

    const imageStyle = { width: wWidth, height: wWidth * 0.6, borderRadius: 0 };
    const titleStyle = { width: 200, height: 24, borderRadius: 6, margin: 30 };
    const descriptionStyle = { width: 300, height: 14, borderRadius: 3, margin: 30, marginTop: 5, marginBottom: 5 };

    return <ScrollView
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={Platform.OS === "web" ? undefined : [0]}
        style={[styles.container, { backgroundColor: '#fff', }]}>
        <SkeletonItem styleProps={imageStyle} />
        <SkeletonItem styleProps={titleStyle} />
        <SkeletonItem styleProps={{ ...descriptionStyle, width: 300 }} />
        <SkeletonItem styleProps={{ ...descriptionStyle, width: 260 }} />
        <SkeletonItem styleProps={{ ...descriptionStyle, width: 300 }} />
        <SkeletonItem styleProps={{ ...descriptionStyle, width: 280 }} />

    </ScrollView>
};

export default Product;

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