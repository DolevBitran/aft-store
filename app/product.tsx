import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform,
    ViewStyle,
    Dimensions,
    Image
} from 'react-native';
import { scale } from 'utils';
import Header from 'components/Header';
import ProductList from 'components/ProductList';
import Text from 'components/Text';
import { useRoute } from '@react-navigation/native';
import AnimatedView, { useSpring } from 'components/AnimatedView';
import SkeletonItem from 'components/SkeletonItem';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@/store';
import { getProduct } from '@/store/selectors/products.selector';


const wWidth = Dimensions.get('window').width

const Product = () => {
    const dispatch = useDispatch<Dispatch>()
    const route = useRoute()
    const product = useSelector(getProduct)
    const id = route?.params?.id
    const descriptionStyle = { width: 300, height: 14, borderRadius: 3, margin: 30, marginTop: 5, marginBottom: 5 };

    const isProductLoaded = product?._id && product._id === id
    React.useEffect(() => {
        if (id) {
            dispatch.product.getProduct(id)
        }
    }, [id])
    React.useEffect(() => {
        if (product) {
            console.log({ product })
        }
    }, [product])

    return <ScrollView
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={Platform.OS === "web" ? undefined : [0]}
        style={[styles.container, { backgroundColor: '#fff', }]}>
        <View style={styles.imageStyle}>
            {
                isProductLoaded ?
                    <Image style={styles.imageStyle} source={{ uri: product.media.images[0].source }} /> :
                    <SkeletonItem styleProps={styles.imageStyle} />
            }
        </View>
        {
            isProductLoaded ?
                <Text style={styles.titleStyle}>{product.title}</Text> :
                <SkeletonItem styleProps={styles.titleStyle} />}
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
    },
    imageStyle: {
        width: wWidth,
        height: wWidth * 0.6,
        borderRadius: 0
    },
    titleStyle: {
        width: 200,
        height: 24,
        borderRadius: 6,
        margin: 30
    }

});