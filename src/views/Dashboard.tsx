import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform,
    Pressable,
    ColorValue,
} from 'react-native';
import Header from 'components/Header';
import Text from 'components/Text';
import * as Svg from 'react-native-svg';
import { useDispatch } from 'react-redux'
import { Dispatch } from 'store';
import Card from 'components/Card';
import i18n from 'utils/i18n';


const Dashboard = () => {
    const dispatch = useDispatch<Dispatch>()
    const onCreateButtonPressed = () => dispatch.app.navigateTo('Create')//bottomSheetRef.current && bottomSheetRef.current.scrollTo(snapPoints[1])
    const onStoreButtonPressed = () => dispatch.app.navigateTo('Store')//bottomSheetRef.current && bottomSheetRef.current.scrollTo(snapPoints[1])


    const CardHeader = ({ title, color }: { title: string, color?: ColorValue }) => <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', width: '86%' }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: color || 'white' }}>{title}</Text>
        <Svg.Svg width="20" height="20" viewBox="0 0 24 24" id="three-dots">
            <Svg.G id="_20x20_three-dots--white" transform="translate(24) rotate(90)">
                <Svg.Rect id="Rectangle" width="24" height="24" fill="none" />
                <Svg.Circle id="Oval" cx="1" cy="1" r="1.5" transform="translate(5 11)" stroke={color || "white"} fill={color || "white"} strokeMiterlimit="10" strokeWidth="0.5" />
                <Svg.Circle id="Oval-2" cx="1" cy="1" r="1.5" transform="translate(11 11)" stroke={color || "white"} fill={color || "white"} strokeMiterlimit="10" strokeWidth="0.5" />
                <Svg.Circle id="Oval-3" cx="1" cy="1" r="1.5" transform="translate(17 11)" stroke={color || "white"} fill={color || "white"} strokeMiterlimit="10" strokeWidth="0.5" />
            </Svg.G>
        </Svg.Svg>
    </View>

    const WeeklySales = () => <Card title="Weekly Sales" bgColor='#7073da' fontColor='white'>
        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'flex-start' }}>Mon 06 - Sat 12</Text>
        <Text style={{ fontWeight: '600', fontSize: 20, color: 'white', alignSelf: 'flex-start' }}>$0.00</Text>
        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'flex-start' }}>0% Increase</Text>
    </Card>

    const StoreOverview = ({ buttonTitle, buttonAction }: { buttonTitle: string, buttonAction: () => void }) => <Card title={i18n.translate('storeOverview')} bgColor='#000000' fontColor='white' cardStyle={{ marginTop: 20 }}>
        <>
            <Text style={{ fontSize: 14, color: 'white', alignSelf: 'flex-start' }}>{i18n.translate('storeOverviewText', { count: 124 })}</Text>
            <Pressable onPress={buttonAction} style={{ backgroundColor: 'white', alignSelf: 'flex-start', borderRadius: 4, paddingVertical: 4, paddingHorizontal: 8, marginTop: 12 }}>
                <Text style={{ fontSize: 16, color: "#574ba1" }}>{i18n.translate('goToStoreButton')}</Text>
            </Pressable>
        </>
    </Card >

    const RecentOrders = () => <Card title={i18n.translate('storeOverview')} bgColor='#ddc5b4' fontColor='#000000' cardStyle={{ marginTop: 20 }}>
        <>
            <Text style={{ fontSize: 14, color: 'black', alignSelf: 'flex-start' }}>{i18n.translate('storeOverviewText', { count: 124 })}</Text>
            <Pressable onPress={onCreateButtonPressed} style={{ backgroundColor: 'white', alignSelf: 'flex-start', borderRadius: 4, paddingVertical: 4, paddingHorizontal: 8, marginTop: 12 }}>
                <Text style={{ fontSize: 16, color: "#574ba1" }}>{i18n.translate('newProductButton')}</Text>
            </Pressable>
        </>
    </Card>

    return <>
        <ScrollView
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={Platform.OS === "web" ? undefined : [0]}
            style={[styles.container, { backgroundColor: '#fff' }]}>
            <Header />
            <View style={{ marginTop: 20 }}>
                <WeeklySales />
                <StoreOverview buttonTitle={'Go To Store'} buttonAction={onStoreButtonPressed} />
                <RecentOrders />
            </View>
        </ScrollView>
    </>
};

export default Dashboard;

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
    textInput: {
        verticalAlign: 'top',
        color: '#475a6e',
        marginTop: 4,
        fontSize: 14,
        borderColor: '#e0e6ee',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 2,
        paddingTop: 6,
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