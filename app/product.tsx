import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform,
    ViewStyle,
    Dimensions,
    Image,
    Button,
    Pressable
} from 'react-native';
import { scale } from 'utils';
import Header from 'components/Header';
import ProductList from 'components/ProductList';
import Text from 'components/Text';
import AnimatedView, { useSpring } from 'components/AnimatedView';
import SkeletonItem from 'components/SkeletonItem';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '@/store';
import { selectProduct } from '@/store/selectors/products.selector';

import { useLocalSearchParams } from 'expo-router';
import i18n from '@/utils/i18n';
import Quantity from '@/components/Quantity';

const wWidth = Dimensions.get('window').width

const ProductImageSkeleton = () => <SkeletonItem styleProps={styles.imageStyle} />
const ProductTitleSkeleton = () => <SkeletonItem styleProps={{ ...styles.titleStyle, width: 200 }} />
const ProductDescriptionSkeleton = () => <>
    {[300, 260, 300, 280].map((width, i) =>
        <SkeletonItem key={i} styleProps={{ ...styles.skeletonDescriptionStyle, width }} />
    )}
</>



const Product = () => {
    const dispatch = useDispatch<Dispatch>()
    const product = useSelector(selectProduct)
    const { id } = useLocalSearchParams()
    const [quantity, setQuantity] = React.useState<number>(1)

    const isProductLoaded = product?._id && product._id === id
    const isCartLoading = useSelector((state: iRootState) => state.loading.models.cart.loading)
    const disabledStyle = { backgroundColor: isCartLoading ? 'gray' : '#0673e8' }


    React.useEffect(() => {
        if (id) {
            dispatch.product.getProduct(id)
        }
    }, [id])

    const addToCart = () => {
        dispatch.cart.addToCart({ quantity, productId: id })
    }

    const onQuantityChange = (quantity: number) => setQuantity(quantity)

    return <><ScrollView
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={Platform.OS === "web" ? undefined : [0]}
        style={[styles.container, { backgroundColor: '#fff', }]}>
        <View style={styles.imageStyle}>
            {
                isProductLoaded ?
                    <Image style={styles.imageStyle} source={{ uri: product.media.images[0].source }} /> :
                    <ProductImageSkeleton />
            }
        </View>
        {
            isProductLoaded ?
                <Text style={styles.titleStyle}>{product.title}</Text> :
                <ProductTitleSkeleton />
        }
        {
            isProductLoaded ?
                <Text style={styles.descriptionStyle}>{product.description}</Text> :
                <ProductDescriptionSkeleton />

        }

    </ScrollView>
        {isProductLoaded && <View style={{ flexDirection: 'row', padding: 20, backgroundColor: '#f2f2f2' }}>
            <Quantity quantity={quantity} onQuantityChange={onQuantityChange} />
            <View style={{
                flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'
            }}>
                <Pressable onPress={addToCart} disabled={isCartLoading} role="button" style={[{ backgroundColor: '#0673e8', borderRadius: 4, paddingVertical: 4, paddingHorizontal: 8, margin: 0 }, disabledStyle]}>
                    <Text style={{ fontSize: 16, color: "#fff" }}>{i18n.translate('productPage.addToCart')}</Text>
                </Pressable>
            </View >
        </View >}
    </>
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
        height: 24,
        borderRadius: 6,
        margin: 30
    },
    descriptionStyle: {
        borderRadius: 6,
        margin: 30
    },
    skeletonDescriptionStyle: {
        width: 300,
        height: 14,
        borderRadius: 3,
        margin: 30,
        marginTop: 5,
        marginBottom: 5
    }
});