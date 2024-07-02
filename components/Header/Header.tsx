import React from 'react'
import {
    View,
    StyleSheet,
    ViewStyle,
    ScrollView,
    Pressable,
    Image,
    TextInput,
    useWindowDimensions,
} from 'react-native';
import IconContainer from 'components/IconContainer';
import CategoryItem from 'components/CategoryItem';
import Text from 'components/Text';
import i18n from 'utils/i18n';
import { Dispatch, iRootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/selectors/auth.selector';
import { selectCategories, selectSearchResults } from 'store/selectors/products.selector';
import { router, usePathname } from 'expo-router';
import { useDebounce } from '@/hooks/useDebounce';
import Input from '../Input';
import { Control, FormProvider, useForm, useFormContext } from 'react-hook-form';

import AnimatedView, { animated, useSpringValue } from 'components/AnimatedView';
import { SpringValue, Controller } from 'react-spring';
import SearchItem from '../SearchItem/SearchItem';
import LottieView from 'lottie-react-native';

const MIN_HEIGHT = 0

interface HeaderProps {
    style?: ViewStyle
}

interface SearchBarInputProps {
    control: Control
    onFocus: () => void
    onBlur: () => void
    forwardedRef: React.RefObject<TextInput | undefined>
}

const SearchBarInput = ({ control, onFocus, onBlur, forwardedRef }: SearchBarInputProps) => {
    return <Input
        name="search"
        control={control}
        inputStyle={styles.searchInput}
        scrollEnabled={false}
        style={styles.searchInputContainer}
        placeholder={i18n.translate('searchBar')}
        inputMode='search'
        placeholderTextColor={'#939eaf'}
        onFocus={onFocus}
        onBlur={onBlur}
        numberOfLines={1}
        forwardedRef={forwardedRef}
    />
}

const Avatar = () => {
    const user = useSelector(selectUser)

    return <View style={styles.avatarContainer}>
        {user?.picture ?
            <Image source={{ uri: user.picture }} style={{
                width: 36,
                height: 36,
            }} /> :
            <Text style={{ color: '#939eaf' }}>{user?.name[0].toUpperCase()}</Text>
        }
    </View>
}

const SearchBarContainer = ({ forwardedRef, heightSpringValue }: { forwardedRef: React.RefObject<TextInput | undefined>, heightSpringValue: SpringValue<number> }) => {
    const dispatch = useDispatch<Dispatch>()
    const searchResults = useSelector(selectSearchResults)
    const isProductsLoading = useSelector((state: iRootState) => state.loading.models.products.loading)
    const { watch, control } = useFormContext()
    const watchSearchValue = watch('search')
    const debouncedSearchValue = useDebounce(watchSearchValue, 500)

    const isLoading = (watchSearchValue !== debouncedSearchValue || isProductsLoading)
    const AnimatedPressable = animated(Pressable)
    const searchLottie = React.useRef<LottieView>(null);

    React.useEffect(() => {
        dispatch.products.searchPoructs(debouncedSearchValue)
    }, [debouncedSearchValue])

    const searchMenuHeight = useSpringValue(MIN_HEIGHT)
    const searchMenuMaxHeight = useSpringValue(MIN_HEIGHT)
    const buttonWidthValue = useSpringValue(0)
    const elevationValue = useSpringValue(0)
    const boxShadowValue = useSpringValue(`0px 0px 8px 1px rgba(0, 0, 0, 0.3})`)

    const onFocusSearchInput = () => {
        !searchMenuHeight.isAnimating && searchLottie.current?.reset()
        searchMenuHeight.start(200)
        searchMenuMaxHeight.start(200)
        buttonWidthValue.start(50)
        elevationValue.start(10)
        boxShadowValue.start(`0px 0px 8px 1px rgba(0, 0, 0, 0.3)`)
        heightSpringValue.start(1000)
        searchLottie.current?.play(0)
    }

    const onBlurSearchInput = () => {
        searchMenuHeight.stop()
        searchMenuHeight.start(0)
        searchMenuMaxHeight.stop()
        searchMenuMaxHeight.start(0)
        buttonWidthValue.stop()
        buttonWidthValue.start(0)
        elevationValue.stop()
        elevationValue.start(0)
        boxShadowValue.stop()
        boxShadowValue.start(`0px 0px 8px 1px rgba(0, 0, 0, 0)`)
        heightSpringValue.stop()
        heightSpringValue.start(0)
    }

    return <View style={styles.searchBarContainer}>
        <Pressable style={{ zIndex: 2 }} onPress={() => dispatch.auth.logoutUser()}>
            <Avatar />
        </Pressable>
        <View style={{ width: 20 }} />
        <SearchBarInput
            control={control}
            onFocus={onFocusSearchInput}
            onBlur={onBlurSearchInput}
            forwardedRef={forwardedRef}
        />
        <AnimatedPressable
            onPress={() => {
                onBlurSearchInput();
                forwardedRef?.current?.blur?.();
            }}
            style={{ zIndex: 4, maxWidth: buttonWidthValue, flexWrap: 'nowrap', overflow: 'hidden' }}>
            <Text style={{ color: 'black', width: 50, textAlign: 'center' }}>ביטול</Text>
        </AnimatedPressable>
        <AnimatedView style={{
            position: 'absolute',
            top: -5,
            right: -5,
            left: -5,
            maxHeight: searchMenuMaxHeight,
            backgroundColor: 'white',
            zIndex: 1,
            borderRadius: 6,
            boxShadow: boxShadowValue,
            // @ts-ignore
            shadowOffset: { width: 10, height: 10 },
            shadowRadius: 0,
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: elevationValue,
            paddingTop: 50,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transitionProperty: 'all 1s ease'
        }}>
            {!searchResults.length && <>
                {watchSearchValue && isLoading ? <Text>Loading</Text> : watchSearchValue ?
                    <Text>Not Found</Text> :
                    <View style={{
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#fff',
                            marginTop: 20
                        }}>

                            <LottieView
                                autoPlay={false}
                                loop={false}
                                ref={searchLottie}
                                style={{
                                    flex: 1,
                                }}
                                resizeMode='contain'

                                source={require('assets/lottie/searchLottie.json')}
                            />
                        </View>
                        <Text style={{ marginTop: 20, color: '#797d80' }}>
                            חפשו מוצרים על פי שם
                        </Text>
                        <Text style={{ marginBottom: 20, color: '#797d80' }}>
                            ועברו לדף המוצר
                        </Text>
                    </View>
                }
            </>
            }
            {!!searchResults.length && <>
                {searchResults.map((product: ProductData, i: number) => <SearchItem key={product._id} product={product} style={i === searchResults.length - 1 ? { paddingBottom: 10 } : {}} />)}
                {isLoading && <Text>Loading</Text>}
            </>}
        </AnimatedView >
    </View >
}

const FilterContainer = () => {
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch<Dispatch>()
    const route = usePathname();
    const categoryRoutes = ['/category']

    const onCartPressed = () => dispatch.app.navigateTo({ name: 'cart' })
    const onSelectCategory = (id: string) => {
        if (categoryRoutes.includes(route)) {
            return router.setParams({ id })
        }
        dispatch.app.navigateTo({ name: 'category', params: { id: id } })
    }

    return <>
        <View style={styles.filterContainer}>
            <Pressable onPress={onCartPressed}>
                <IconContainer />
            </Pressable>
            <View style={{ width: 20 }} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((c: Category, i: number) => <View key={c._id} style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => onSelectCategory(c._id)}>
                        <CategoryItem category={c} />
                    </Pressable>
                    <View style={{ width: 15 }} />
                </View>)}
            </ScrollView>
        </View>
    </>
}

const Hr = () => <View
    style={{
        borderBottomColor: '#e9ebeb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 20,
        zIndex: -1
    }}
/>

const HeaderContainer = ({ style = {} }: HeaderProps) => {
    const route = usePathname();
    const cleanRoutes = ['/product', '/']

    const { height } = useWindowDimensions()
    const AnimatedPressable = animated(Pressable)


    const inputRef = React.createRef<TextInput>()
    const isFocusedRef = React.useRef<boolean>(false)
    const heightSpringValue = useSpringValue(0, {
        config: {
            mass: 0,
            friction: 0,
            tension: 0,
        },
    })

    const methods = useForm()

    const onOverlayPressed = () => {
        if (inputRef.current) {
            inputRef.current.blur()
        }
    }

    if (cleanRoutes.includes(route)) {
        return null
    }

    return (
        <FormProvider {...methods}>
            <View style={[styles.headerContainer]} >
                <AnimatedPressable style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    height: heightSpringValue
                }}
                    onPress={onOverlayPressed}
                />
                <View>
                    <View style={[{ width: '100%' }, style]}>
                        <SearchBarContainer forwardedRef={inputRef} heightSpringValue={heightSpringValue} />
                        <FilterContainer />
                    </View>
                </View>
                <Hr />
            </View>
        </FormProvider>)
}

export default HeaderContainer;


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        width: '100%',
        overflow: 'visible',
        zIndex: 2
    },
    avatarContainer: {
        width: 36,
        height: 36,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#e9ebeb',
        borderStyle: 'solid',
        borderWidth: 1,
        overflow: 'hidden',
    },
    searchBarContainer: {
        position: 'relative',
        width: '86%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20

    },
    searchInputContainer: {
        flex: 1,
        backgroundColor: '#f5f6f6',
        borderRadius: 6,
        height: 36,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#939eaf',
        margin: 0,
        zIndex: 2,
    },
    searchInput: {
        flex: 1,
        color: '#444444',
        fontSize: 14,
        borderWidth: 0,
        marginTop: 0,
        paddingHorizontal: 0,
        // paddingVertical: 10,
        verticalAlign: 'middle'

    },
    filterContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '93%',
        alignSelf: 'flex-end',
        zIndex: -1
    },
});

