import React from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Platform,
    Pressable,
} from 'react-native';
import i18n from 'utils/i18n';
import Input, { SelectInput } from 'components/Input';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getMediaAssetArray } from 'store/selectors/media.selector';
import ImagePicker from 'components/ImagePicker';
import AnimatedView from 'components/AnimatedView';
import { getRTLMode } from 'store/selectors/app.selector';
import { SpringValue, useSpringValue } from 'utils/react-spring';
import UploadItem from 'components/UploadItem';
import Text from 'components/Text';


const Paginator = ({ data, scrollX, itemWidth }: { data: IAsset[], scrollX: SpringValue<number>, itemWidth: number }) => {
    const RTL_Mode = useSelector(getRTLMode)

    return <View style={{ flexDirection: Platform.OS !== 'web' && RTL_Mode ? 'row-reverse' : 'row', margin: 20 }}>
        {data.map((item: IAsset, index: number) => {
            const inputRange = [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth];

            const dotWidth = scrollX.to(inputRange, [8, 16, 8], 'clamp')
            const dotColor = scrollX.to(inputRange, ['#b9b9b9', '#808080', '#b9b9b9'], 'clamp')

            return <AnimatedView style={{ height: 8, borderRadius: 4, backgroundColor: dotColor, width: dotWidth, marginRight: 8, marginLeft: 8 }} key={index} />
        })}
    </View>
}

const ImageUploadGallery = ({ assets }: { assets: IAsset[] }) => {
    const itemWidth = 200
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    const slideRef = React.useRef<FlatList<IAsset> | null>()
    const scrollX = useSpringValue(0)
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

    // @TODO change index to _id
    const renderItem = ({ item, index }: { item: IAsset, index: number }) =>
        <UploadItem item={item} index={index} key={index} />

    const onViewableItemsChanged = () => { } // ({viewableItems}) => setCurrentIndex(viewableItems[0].index as number)
    const viewabilityConfigCallbackPairs = React.useRef([{ viewabilityConfig, onViewableItemsChanged }])

    return <>
        <View style={{ alignItems: 'center' }}>
            <FlatList
                style={{ width: itemWidth }}
                data={assets}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                renderItem={renderItem}
                onScroll={event => scrollX.set(Math.abs(event.nativeEvent.contentOffset.x))}
                scrollEventThrottle={32}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                keyExtractor={item => item.assetId}
                ref={ref => slideRef.current = ref}
            />
            <Paginator data={assets} scrollX={scrollX} itemWidth={itemWidth} />
        </View>
    </>
}


type ProductFormProps = {
}

const ProductForm = ({ }: ProductFormProps) => {
    const assets = useSelector(getMediaAssetArray)
    const { control, handleSubmit } = useForm()
    const onSubmit = (data: any) => console.log({ data })

    const categories = ["בדיקה", "אוזניות", "קטגוריה 1", "קטגוריה 2 ", "קטגוריה 3", "קטגוריה 4", "קטגוריה 5", "קטגוריה 6", "קטגוריה 7", "קטגוריה 8", "קטגוריה 9",]

    return <>
        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            <ImagePicker />
            <ImageUploadGallery assets={assets} />
        </View>
        <Input
            title={i18n.translate('productForm.title')}
            name="title"
            control={control}
            scrollEnabled={false}
            placeholder={i18n.translate('productForm.titlePlaceholder')}
        />

        <View style={styles.inputRow}>
            <SelectInput
                title={i18n.translate('productForm.category')}
                style={{ flex: 2 }}
                name="category"
                control={control}
                data={categories}
                placeholder={i18n.translate('productForm.selectCategory')}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    console.log(selectedItem)
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                onSelect={console.log}
            />
            <View style={{ width: 20 }} />
            <Input
                title={i18n.translate('productForm.price')}
                name="price"
                control={control}
                scrollEnabled={false}
                style={{ flex: 1.5 }}
                placeholder='0.00'
                inputMode='numeric'
            />
        </View>

        <Input
            title={i18n.translate('productForm.description')}
            name="description"
            control={control}
            scrollEnabled={false}
            style={styles.multilineInputContainer}
            inputStyle={styles.multilineInput}
            numberOfLines={4}
            multiline
            placeholder={i18n.translate('productForm.titlePlaceholder')}
        />
        <Pressable
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}>
            <Text style={styles.submitButtonText}>{i18n.translate('productForm.submit')}</Text>
        </Pressable>
    </>
}

export default ProductForm;


const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        marginTop: 20
    },
    multilineInputContainer: {
        flex: 1.5,
        marginTop: 20
    },
    multilineInput: {
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
    submitButton: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginTop: 12
    },
    submitButtonText: {
        fontSize: 20,
        color: "#574ba1"
    }
});

