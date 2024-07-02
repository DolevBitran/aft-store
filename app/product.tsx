import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform,
    Dimensions,
    Image,
    Pressable,
    useWindowDimensions,
    Animated
} from 'react-native';
import Text from 'components/Text';
import SkeletonItem from 'components/SkeletonItem';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState, store } from '@/store';
import { selectProduct } from '@/store/selectors/products.selector';

import { useLocalSearchParams } from 'expo-router';
import i18n from '@/utils/i18n';
import Quantity from '@/components/Quantity';


import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';


const wWidth = Dimensions.get('window').width
const isRTL = store.getState().app.RTL

const ProductImageSkeleton = () => <SkeletonItem styleProps={styles.imageStyle} />
const ProductTitleSkeleton = () => <SkeletonItem styleProps={{ ...styles.titleStyle, width: 200 }} />
const PriceSkeleton = () => <SkeletonItem styleProps={{ ...styles.titleStyle, width: 50 }} />
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

    const forwardedRef = React.createRef<ICarouselInstance>()

    React.useEffect(() => {
        if (id) {
            dispatch.product.getProduct(id)
        }
    }, [id])

    const addToCart = () => {
        dispatch.cart.addToCart({ quantity, productId: id })
    }

    const scrollToCarouselIndex = (index: number) => {
        forwardedRef.current?.scrollTo?.({ index, animated: true })
    }

    const onQuantityChange = (quantity: number) => setQuantity(quantity)

    return <View style={{ flex: 1 }}>
        <ScrollView
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={Platform.OS === "web" ? undefined : [0]}
            style={[styles.container, { backgroundColor: '#fff', }]}>
            <View style={styles.imageContainer}>
                {isProductLoaded && <>
                </>
                }
                {
                    isProductLoaded ?
                        // <Image style={styles.imageStyle} source={{ uri: product.media.images[0].source }} />
                        <CarouselComponent product={product} forwardedRef={forwardedRef} />
                        :
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
            {
                isProductLoaded ?
                    <Text style={styles.priceStyle}>{product.price.toFixed(2)}$</Text> :
                    <PriceSkeleton />
            }

        </ScrollView>
        {isProductLoaded && <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#f2f2f2' }}>
            <View style={{ flexDirection: 'row' }}>
                <Quantity quantity={quantity} onQuantityChange={onQuantityChange} />
                <View style={{ width: 40 }} />
            </View>
            <View style={{
                flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'
            }}>
                <Pressable onPress={addToCart} disabled={isCartLoading} role="button"
                    style={[{ backgroundColor: '#0673e8', borderRadius: 4, paddingVertical: 12, margin: 0, flex: 1, alignItems: 'center' }, disabledStyle]}>
                    <Text style={{ fontSize: 20, color: "#fff" }}>{i18n.translate('productPage.addToCart')}</Text>
                </Pressable>
            </View >
        </View >}
    </View>
};


const CarouselComponent = ({ product, forwardedRef }: { product: ProductData, forwardedRef: React.RefObject<ICarouselInstance> }) => {
    const scrollOffsetValue = useSharedValue<number>(0);
    const { width, height } = useWindowDimensions()
    const scrollX = React.useRef(new Animated.Value(0)).current
    const scrollToCarouselIndex = (index: number) => {
    }
    const arr = [1, 2, 3]

    return <>
        {arr.map((el, index) => <ListIteeem key={index} el={el} index={index} scrollX={scrollX} product={product} />)}
        <Carousel
            ref={forwardedRef}
            loop={false}
            vertical={false}
            defaultScrollOffsetValue={scrollOffsetValue}
            onProgressChange={(_, absoluteProgress) => {
                // console.log({ absoluteProgress })
                scrollX.setValue(absoluteProgress)
            }}
            style={{ width: "100%" }}
            // autoPlay={true}
            // autoPlayInterval={100}
            onConfigurePanGesture={g => g.enabled(false)}
            pagingEnabled={true}
            snapEnabled
            width={width}
            height={width * 0.6}
            data={[1, 2, 3, 4, 5]}
            onSnapToItem={(index: number) => console.log('current index:', index)}
            renderItem={({ index }: { index: number }) => (
                <View
                    key={index}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Image style={styles.imageStyle} source={{ uri: product.media.images[0].source }} />
                </View>
            )}
        />
    </>
}

const ListIteeem = ({ el, index, scrollX, product }: { el: any, index: number, scrollX: Animated.Value, product: ProductData }) => {

    const inputRange = [
        (index - 1),
        index,
        (index + 1),
    ];


    const elevation = scrollX.interpolate({
        inputRange,
        outputRange: [0, 2, 0],
        extrapolate: "clamp",
    });

    const boxShadow = scrollX.interpolate({
        inputRange,
        outputRange: [0, 0.3, 0],
        extrapolate: "clamp",
    });

    return <Animated.View style={[styles.smallImageContainer, {
        top: 20 + index * 60, left: 20,
        boxShadow: `0px 0px 8px 1px rgba(0, 0, 0, ${boxShadow}})`,
        elevation: elevation,
        // @ts-ignore
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 0,
        shadowColor: 'blue',
        shadowOpacity: 1,
    }]}>
        <Image style={styles.imageSmallStyle} source={{ uri: product.media.images[0].source }} />
    </Animated.View>
}


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
    imageContainer: {
        position: 'relative',
        width: wWidth,
        height: wWidth * 0.6,
        borderRadius: 0
    },
    imageStyle: {
        flex: 1,
        width: wWidth,
        height: wWidth * 0.6,
        borderRadius: 0
    },
    smallImageContainer: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 6,
        height: 40,
        width: 40,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        overflow: 'hidden',
    },
    imageSmallStyle: {
        flex: 1,
        // width: 40,
        // height: 40,
    },
    titleStyle: {
        fontWeight: 700,
        fontSize: 24,
        height: 24,
        borderRadius: 6,
        margin: 30
    },
    priceStyle: {
        fontWeight: 700,
        fontSize: 24,
        height: 24,
        borderRadius: 6,
        margin: 30,
        writingDirection: isRTL ? 'rtl' : 'ltr',
        alignSelf: 'flex-start'
    },
    descriptionStyle: {
        fontSize: 16,
        color: '#939393',
        borderRadius: 6,
        marginHorizontal: 30,
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