import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native';
import Text from 'components/Text';
import { scale } from 'utils';


type IconContainerProps = {
}

const IconContainer = ({ }: IconContainerProps) => (
    <View style={styles.iconContainer}>
        <Text style={{ color: '#939eaf' }}>S</Text>
    </View>
)

export default IconContainer;


const styles = StyleSheet.create({
    iconContainer: {
        width: 36,
        height: 36,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#e9ebeb',
        borderStyle: 'solid',
        borderWidth: 1
    }
});

