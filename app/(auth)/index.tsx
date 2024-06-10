import * as React from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    StyleProp,
    ViewStyle
} from 'react-native';
import Text from 'components/Text';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { getFromStorage } from 'service/storage';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'store';

import * as Svg from 'react-native-svg';
import { scale } from 'utils';
import { selectUser } from 'store/selectors/auth.selector';
import i18n from 'utils/i18n';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
    const dispatch = useDispatch<Dispatch>()
    const user = useSelector(selectUser)
    const [userInfo, setUserInfo] = React.useState<any>(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '352900253507-gmmrpjkbv0bv2md6ee6nn4ad0bj4gen5.apps.googleusercontent.com',
        // iosClientId:,
        clientId: '352900253507-gmmrpjkbv0bv2md6ee6nn4ad0bj4gen5.apps.googleusercontent.com',
        webClientId: '352900253507-6l43eaesctjl3ivu97g897te9iggs1el.apps.googleusercontent.com',
        // expoClientId: '352900253507-s4tcnjn6vqaniu3fjnk2fo8aru593n0i.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri()
    })

    React.useEffect(() => {
        console.log('user', { user })
        user && dispatch.app.navigateTo('/dashboard')
    }, [user])

    React.useEffect(() => {
        dispatch.auth.requestSignInWithGoogle(response)
    }, [response])


    return <View style={styles.container}>
        <Text style={styles.loginTitle}>{i18n.translate('login.loginTitle')}</Text>
        <Text style={styles.loginDescription}>{i18n.translate('login.loginSubtitle')}</Text>
        <Pressable onPress={() => promptAsync()} style={styles.googleButton}>
            <GoogleSvg />
            <View style={{ width: 16 }} />
            <Text style={{ fontSize: 20 }}>
                {i18n.translate('login.googleLogin')}
            </Text>
        </Pressable>
        <Pressable style={{ margin: 10 }} onPress={() => dispatch.auth.logoutUser()}>
            <Text>
                Remove User
            </Text>
        </Pressable>
        <Pressable style={{ margin: 10 }} onPress={async () => console.log(await getFromStorage('access_token'))}>
            <Text>
                Print Access Token
            </Text>
        </Pressable>
        <Pressable style={{ margin: 10 }} onPress={async () => console.log(await getFromStorage('refresh_token'))}>
            <Text>
                Print Refresh Token
            </Text>
        </Pressable>
        <Pressable style={{ margin: 10 }} onPress={dispatch.auth.refreshAccessToken}>
            <Text>
                Refresh Token
            </Text>
        </Pressable>
    </View>
};

const GoogleSvg = ({ style = {} }: { style?: StyleProp<ViewStyle> }) => {
    return <Svg.Svg width="22" height="22.44" viewBox="0 0 186.69 190.5" style={style}>
        <Svg.G transform="translate(1184.583 765.171)">
            <Svg.Path d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4" />
            <Svg.Path d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853" />
            <Svg.Path d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05" />
            <Svg.Path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" />
        </Svg.G>
    </Svg.Svg>
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: 50,
        justifyContent: 'flex-start',
        paddingTop: 120,
    },
    loginTitle: {
        fontSize: 26,
        fontWeight: '500',
        marginBottom: 10
    },
    loginDescription: {
        fontSize: 14,
        marginBottom: 30
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#c4c4c4',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 28,
        paddingVertical: 6,
        alignSelf: 'flex-start',
        // width: 210
    }
});