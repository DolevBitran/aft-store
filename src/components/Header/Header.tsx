import React from 'react'
import {
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    ScrollView,
    Pressable,
    Image
} from 'react-native';
import IconContainer from 'components/IconContainer';
import CategoryItem from 'components/CategoryItem';
import Text from 'components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'store';
import { getUser } from 'store/selectors/auth.selector';
import i18n from 'utils/i18n';

type HeaderProps = {
    style?: ViewStyle
}


const SearchBarInput = () => (
    <View style={styles.searchInputContainer}>
        <Text style={{ color: '#939eaf' }} numberOfLines={1}>{i18n.translate('searchBar')}</Text>
    </View>
)

const Avatar = () => {
    const user = useSelector(getUser)

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

const SearchBarContainer = () => {
    const dispatch = useDispatch<Dispatch>()


    return <View style={styles.searchBarContainer}>
        <Pressable onPress={() => dispatch.auth.logoutUser()}>
            <Avatar />
        </Pressable>
        <View style={{ width: 20 }} />
        <SearchBarInput />
    </View>
}
const FilterContainer = () => <>
    <View style={styles.filterContainer}>
        <IconContainer />
        <View style={{ width: 20 }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array(5).fill(0).map((e, i) => <View key={i} style={{ flexDirection: 'row' }}>
                <CategoryItem />
                <View style={{ width: 15 }} />
            </View>)}
        </ScrollView>
    </View>
</>

const Hr = () => <View
    style={{
        borderBottomColor: '#e9ebeb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 20
    }}
/>

const HeaderContainer = ({ style = {} }: HeaderProps) => <View style={[styles.headerContainer]}>
    <View>
        <View style={[{ width: '100%', alignSelf: 'center' }, style]}>
            <SearchBarContainer />
            <FilterContainer />
        </View>
    </View>
    <Hr />
</View>

export default HeaderContainer;


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
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
        overflow: 'hidden'
    },
    searchBarContainer: {
        width: '86%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    searchInputContainer: {
        flex: 1,
        backgroundColor: '#e9ebeb71',
        borderRadius: 6,
        height: 36,
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    filterContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '93%',
        alignSelf: 'flex-end'
    },
});

