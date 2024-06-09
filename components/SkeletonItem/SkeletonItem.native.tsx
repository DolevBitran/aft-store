import AnimatedView, { useSpring, animated } from 'components/AnimatedView/AnimatedView.native';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { getRTLMode } from 'store/selectors/app.selector';

const SkeletonItem = ({ styleProps: style }: { styleProps: { width: number, height: number } & ViewStyle }) => {
    const RTL_MODE = useSelector(getRTLMode)

    const gradientWidth = style.width / 2
    const startPoint = RTL_MODE ? gradientWidth : -gradientWidth
    const endPoint = RTL_MODE ? - style.width - gradientWidth : style.width + gradientWidth

    const [props, api] = useSpring(
        () => ({
            from: { translateX: startPoint },
            to: { translateX: endPoint },
            loop: true,
            config: {
                duration: 1000,
            },
            delay: 300
        }),
        []
    )

    const gradientStyle = {
        // backgroundColor: 'white',
        width: gradientWidth,
        height: style.height,
        transform: [{ translateX: props.translateX }]
    }

    const AnimatedLinearGradient = animated(LinearGradient)

    return <AnimatedView style={[styles.skeletonContainerStyle, style]}>
        <AnimatedLinearGradient
            colors={['#ccc', '#dedede', '#ccc']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={gradientStyle}>
        </AnimatedLinearGradient>
        {/* <AnimatedView style={gradientStyle} /> */}
    </AnimatedView>
}

const styles = StyleSheet.create({
    skeletonContainerStyle: {
        backgroundColor: '#ccc',
        overflow: 'hidden'
    }
})

export default SkeletonItem;