import * as React from 'react';
import {
    Platform,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    StatusBar,
    Image,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    FlatList,
    I18nManager
} from 'react-native';
import Text from 'components/Text';

import * as WebBrowser from 'expo-web-browser';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from 'store';
import * as ImagePicker from 'expo-image-picker';

import { uniqueSid } from 'utils';
import { getMediaAssetArray, getMediaUploadPercentage } from 'store/selectors/media.selector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { uploadAsset } from 'utils/upload';
import { SpringValue, useSpringValue } from 'utils/react-spring';
import AnimatedView from 'components/AnimatedView';
import { getRTLMode } from 'store/selectors/app.selector';

import { useForm } from 'react-hook-form';
import TextInput from 'components/TextInput';
import SelectDropdown from 'react-native-select-dropdown'
import i18n from 'utils/i18n';


WebBrowser.maybeCompleteAuthSession();



const ImagePickerButton = () => {
    const dispatch = useDispatch<Dispatch>()

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                base64: true,
                allowsMultipleSelection: true
            });

            if (result.assets?.length) {
                const fileExtension = Platform.OS === 'web' ?
                    result.assets[0].uri.substring("data:image/".length, result.assets[0].uri.indexOf(";base64")) :
                    result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('.') + 1);

                const assetsArray: IAsset[] = result.assets.map(asset => ({ ...asset, fileExtension, assetId: uniqueSid() }))

                dispatch.media.appendAssets(assetsArray);
                const assets = await Promise.all(assetsArray.map(asset => uploadAsset(asset)))
                console.log(assets)
                if (!result.canceled) {
                }
            }
        } catch (err) {
            console.error('fn: PickImage', err)
        }
    };

    return <>
        <Pressable onPress={pickImage} style={{
            backgroundColor: 'white',
            alignSelf: 'flex-start',
            borderRadius: 4,
            paddingVertical: 4,
            paddingHorizontal: 8,
            marginTop: 12,
            height: 160,
            width: 160,
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: 'dashed',
            borderColor: 'gray',
            borderWidth: 2
        }}>
            <Text style={{ fontSize: 14, color: "#574ba1" }}>Add product images</Text>
        </Pressable>
    </>
}



const ImageUploadGallery = ({ assets }: { assets: IAsset[] }) => {
    const itemWidth = 200
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    const slideRef = React.useRef<FlatList<IAsset> | null>()
    const scrollX = useSpringValue(0)
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

    const uploadData = useSelector(getMediaUploadPercentage)
    const getUploadPercentage = (assetId: string) => uploadData?.[assetId]?.percentage

    const renderItem = ({ item, index }: { item: IAsset, index: number }) => <View style={{ width: 200, padding: 20 }} key={index} >
        <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: item.uri }} style={styles.imagePreview} />
        </View>
        <Text style={styles.uploadPercentageText}>
            {getUploadPercentage(item.assetId) === 100 ? 'Uploaded' : `${getUploadPercentage(item.assetId) || 0}%`}
        </Text>
        <View style={styles.uploadBar}>
            <View style={[styles.uploadBarProgress, { left: `-${100 - (getUploadPercentage(item.assetId) || 0)}%` }]}>
            </View>
        </View>
    </View>

    const onViewableItemsChanged = () => { } // ({ viewableItems }) => setCurrentIndex(viewableItems[0].index as number)
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
                // onViewableItemsChanged={onViewableItemsChanged}// }
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                // viewabilityConfig={{ itemVisiblePercentThreshold: '50%' }}
                keyExtractor={item => item.assetId}
                ref={ref => slideRef.current = ref}
            />
            <Paginator data={assets} scrollX={scrollX} itemWidth={itemWidth} />
        </View>
    </>
}

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



const Create = () => {
    const uploadData = useSelector(getMediaUploadPercentage)
    const assets = useSelector(getMediaAssetArray)
    const getUploadPercentage = (assetId: string) => uploadData?.[assetId]?.percentage

    const onFocusBottomSheet = (e: NativeSyntheticEvent<TextInputFocusEventData>) => { e.preventDefault() }

    // const ImageUploadGallery = () => <ScrollView horizontal pagingEnabled={true} snapToAlignment="center" style={{ width: 200 }}>
    //     {assets.map((asset, index) =>
    //         <View style={{ width: 200, padding: 20 }} key={index} >
    //             <View style={styles.imagePreviewContainer}>
    //                 <Image source={{ uri: asset.uri }} style={styles.imagePreview} />
    //             </View>
    //             <Text style={styles.uploadPercentageText}>
    //                 {getUploadPercentage(asset.assetId) === 100 ? 'Uploaded' : `${getUploadPercentage(asset.assetId) || 0}%`}
    //             </Text>
    //             <View style={styles.uploadBar}>
    //                 <View style={[styles.uploadBarProgress, { left: `-${100 - (getUploadPercentage(asset.assetId) || 0)}%` }]}>
    //                 </View>
    //             </View>
    //         </View>)}
    // </ScrollView>

    const { control, handleSubmit } = useForm()

    const onSubmit = (data: any) => console.log({ data })
    const categories = ["בדיקה", "אוזניות", "קטגוריה 1", "קטגוריה 2 ", "קטגוריה 3", "קטגוריה 4", "קטגוריה 5", "קטגוריה 6", "קטגוריה 7", "קטגוריה 8", "קטגוריה 9",]

    const ProductForm = () => <>
        <Text style={styles.inputLabel}>{i18n.translate('productForm.title')}</Text>
        <TextInput
            name="title"
            control={control}
            scrollEnabled={false}
            onFocus={onFocusBottomSheet}
            placeholder={i18n.translate('productForm.titlePlaceholder')}
            style={styles.textInput} />
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 2 }}>
                <Text style={styles.inputLabel}>{i18n.translate('productForm.category')}</Text>
                {/* <TextInput name="category" control={control} scrollEnabled={false} onFocus={onFocusBottomSheet} value="Kitchen"
                    style={styles.textInput} /> */}

                <SelectDropdown
                    data={categories}
                    defaultButtonText={i18n.translate('productForm.selectCategory')}
                    buttonStyle={styles.textInput}
                    buttonTextStyle={styles.textInputInnerText}
                    dropdownStyle={{
                        marginTop: 0,
                        borderRadius: 8,
                        height: 'auto',
                        maxHeight: 200
                    }}
                    rowStyle={{
                        paddingVertical: 5,
                        margin: 0,
                        height: 36,
                        borderBottomWidth: 0,
                        borderTopWidth: 0
                    }}
                    rowTextStyle={{
                        color: '#475a6e',
                        fontSize: 14,
                    }}
                    dropdownOverlayColor={'transparent'}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
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
                    renderCustomizedRowChild={(selectedItem: string, index: number, isSelected?: boolean) => {
                        return <View style={{ height: 'auto', paddingHorizontal: 8 }}>
                            <Text>{selectedItem}</Text>
                        </View>
                    }}
                />
            </View>
            <View style={{ width: 20 }} />
            <View style={{ flex: 1.5 }}>
                <Text style={styles.inputLabel}>{i18n.translate('productForm.price')}</Text>
                <TextInput name="price" control={control} scrollEnabled={false} onFocus={onFocusBottomSheet} placeholder='0.00' inputMode='numeric'
                    style={styles.textInput} />
            </View>
        </View>



        <Text style={[{ marginTop: 20 }, styles.inputLabel]}>{i18n.translate('productForm.description')}</Text>
        <TextInput control={control} name="description" scrollEnabled={false} onFocus={onFocusBottomSheet} numberOfLines={4} multiline placeholder={i18n.translate('productForm.titlePlaceholder')}
            style={{
                ...styles.textInput, paddingHorizontal: 14,
                paddingVertical: 4,
            }} />
    </>

    return <KeyboardAwareScrollView style={styles.container}>
        <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                <ImagePickerButton />
                <ImageUploadGallery assets={assets} />
            </View>
            <ProductForm />
            <Pressable
                onPress={handleSubmit(onSubmit)}
                style={{ backgroundColor: 'white', alignSelf: 'flex-start', borderRadius: 4, paddingVertical: 4, paddingHorizontal: 8, marginTop: 12 }}>
                <Text style={{ fontSize: 20, color: "#574ba1" }}>{i18n.translate('productForm.submit')}</Text>
            </Pressable>
        </View>
    </KeyboardAwareScrollView >
};



export default Create;

const isRTL = store.getState().app.RTL
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
    inputLabel: {
        fontSize: 20,
        fontWeight: '500'
    },
    textInput: {
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
        backgroundColor: 'transparent',
        color: '#475a6e',
        verticalAlign: 'top',
        marginTop: 4,
        borderColor: '#e0e6ee',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 4,
        fontSize: 18,
        height: 'auto',
        width: 'auto',
        outlineStyle: 'none',
    },
    textInputInnerText: {
        height: 'auto',
        width: 'auto',
        verticalAlign: 'top',
        textAlign: 'auto',
        color: '#475a6e',
        fontSize: 18,
        padding: 0,
        direction: 'ltr',
        marginHorizontal: 0,
        paddingVertical: Platform.OS == 'web' ? 0 : 2,
    },

    uploadBar: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 10,
        overflow: 'hidden',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#d5d5d5'
    },
    uploadBarProgress: {
        backgroundColor: '#56aaff',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    uploadPercentageText: {
        color: 'gray',
        fontSize: 12,
        marginTop: 20
    },
    imagePreviewContainer: {
        width: '100%',
        height: 90
    },
    imagePreview: {
        height: '100%',
        objectFit: 'scale-down'
    },
});