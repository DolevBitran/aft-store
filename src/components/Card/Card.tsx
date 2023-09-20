import React from 'react'
import {
    View,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import Text from 'components/Text';
import * as Svg from 'react-native-svg';
import { ColorValue } from 'react-native';

type CardProps = {
    title: string
    bgColor: ColorValue
    fontColor: ColorValue
    children: React.ReactNode
    cardStyle?: ViewStyle
}

const CardHeader = ({ title, color }: { title: string, color?: ColorValue }) => <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', width: '100%' }}>
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


const Card = ({ title, bgColor, fontColor, children, cardStyle = {} }: CardProps) => {

    return <View style={[styles.cardContainer, { backgroundColor: bgColor }, cardStyle]}>
        <CardHeader title={title} color={fontColor} />
        <View style={styles.cardBody}>
            {children}
        </View>
    </View>
}

export default Card;


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#7073da',
        borderRadius: 14,
        marginHorizontal: '8%',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    cardBody: {
        marginTop: 20,
    },
});

