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
    FlatList
} from 'react-native';
import Text from 'components/Text';
import SkeletonItem from 'components/SkeletonItem';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState, store } from '@/store';
import { selectProduct } from '@/store/selectors/products.selector';

import { useLocalSearchParams } from 'expo-router';
import i18n from '@/utils/i18n';
import Quantity from '@/components/Quantity';


// import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
// import { useSharedValue } from 'react-native-reanimated';
import { SpringValue, useSpringValue } from 'react-spring';
import { getRTLMode } from '@/store/selectors/app.selector';
import AnimatedView, { animated } from '@/components/AnimatedView';


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

    const forwardedRef = React.createRef<FlatList>()

    React.useEffect(() => {
        if (id) {
            dispatch.product.getProduct(id)
        }
    }, [id])

    const addToCart = () => {
        dispatch.cart.addToCart({ quantity, productId: id })
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

const CarouselComponent = ({ product, forwardedRef }: { product: ProductData, forwardedRef: React.RefObject<FlatList> }) => {
    const itemWidth = wWidth
    const data = [
        {
            source: product.media.images[0].source,
            index: 0
        },
        {
            source: product.media.images[0].source,
            index: 1
        },
        {
            source: product.media.images[0].source,
            index: 2
        },
    ]
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    const slideRef = React.useRef<FlatList<IAsset> | null>()
    const scrollX = useSpringValue(0)

    React.useEffect(() => {
        if (isRTL && Platform.OS === 'android') {
            scrollX.set(itemWidth * 2)
        }
    })
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

    const onViewableItemsChanged = () => { } // ({viewableItems}) => setCurrentIndex(viewableItems[0].index as number)
    const viewabilityConfigCallbackPairs = React.useRef([{ viewabilityConfig, onViewableItemsChanged }])

    const shouldReverse = isRTL && Platform.OS === 'android'

    return <>
        <View style={{ alignItems: 'center', flex: 1 }}>
            <FlatList
                style={{ width: itemWidth, flexDirection: 'row' }}
                data={shouldReverse ? data.reverse() : data}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                renderItem={({ item }: { item: { source: string, index: number } }) => (
                    <View
                        key={item.index}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Image style={styles.imageStyle} source={{ uri: item.source }} />
                    </View>
                )}
                onScroll={event => scrollX.set(Math.abs(event.nativeEvent.contentOffset.x))}
                scrollEventThrottle={32}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                keyExtractor={(item: { index: number, source: string }) => item.index.toString()}
                ref={ref => forwardedRef.current = ref}
                initialScrollIndex={0} // specify last index
                initialNumToRender={data.length}
            />
            {data.map((el, index) => <ThumbItem onPress={() => forwardedRef.current?.scrollToIndex({ index, animated: true })}
                key={index} el={el} index={el.index} scrollX={scrollX} itemWidth={itemWidth} product={product} />)}
            <Paginator data={data} scrollX={scrollX} itemWidth={itemWidth} />
        </View>
    </>
}


const Paginator = ({ data, scrollX, itemWidth }: { data: any[], scrollX: SpringValue<number>, itemWidth: number }) => {
    const RTL_Mode = useSelector(getRTLMode)

    return <View style={{ flexDirection: Platform.OS !== 'web' && RTL_Mode ? 'row-reverse' : 'row', margin: 20, backgroundColor: 'transparent' }}>
        {data.map((item: IAsset, index: number) => {
            const inputRange = [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth];
            console.log(scrollX.get())
            const dotWidth = scrollX.to(inputRange, [8, 16, 8], 'clamp')
            const dotColor = scrollX.to(inputRange, ['#b9b9b9', '#808080', '#b9b9b9'], 'clamp')

            return <AnimatedView style={{ height: 8, borderRadius: 4, backgroundColor: dotColor, width: dotWidth, marginRight: 8, marginLeft: 8 }} key={index} />
        })}
    </View>
}

const ThumbItem = ({ el, itemWidth, index, onPress, scrollX, product }: { el: any, index: number, itemWidth: number, onPress: () => void, scrollX: SpringValue, product: ProductData }) => {
    const inputRange = [
        (index - 1) * itemWidth,
        index * itemWidth,
        (index + 1) * itemWidth
    ];

    const elevation = scrollX.to(
        inputRange,
        [0, 2, 0],
        "clamp"
    );

    const boxShadow = scrollX.to(
        inputRange,
        [`0px 0px 8px 1px rgba(0, 0, 0, 0)`, `0px 0px 8px 1px rgba(0, 0, 0, 0.3)`, `0px 0px 8px 1px rgba(0, 0, 0, 0)`],
        "clamp"
    );
    const AnimtedPressable = animated(Pressable)

    return <AnimtedPressable
        onPress={onPress}
        style={{
            ...styles.smallImageContainer,
            top: 20 + index * 60, left: 20,
            boxShadow: boxShadow,
            // @ts-ignore
            elevation: elevation,
            shadowOffset: { width: 10, height: 10 },
            shadowRadius: 0,
            shadowColor: 'blue',
            shadowOpacity: 1,
        }}>
        <Image style={styles.imageSmallStyle} source={{ uri: el.source }} />
    </AnimtedPressable >
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
        // borderColor: 'green',
        borderRadius: 6,
        borderStyle: 'solid',
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