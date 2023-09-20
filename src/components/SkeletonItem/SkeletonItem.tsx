import AnimatedView, { useSpring } from 'components/AnimatedView';
import { useSelector } from 'react-redux';
import { getRTLMode } from 'store/selectors/app.selector';

const SkeletonItem = ({ styleProps: style }: { styleProps: { width: number, height: number } & React.CSSProperties }) => {
    const RTL_MODE = useSelector(getRTLMode)


    const gradientWidth = style.width / 2
    const startPoint = RTL_MODE ? gradientWidth : -gradientWidth
    const endPoint = RTL_MODE ? - style.width - gradientWidth : style.width + gradientWidth

    const [props, api] = useSpring(
        () => ({
            from: { translateX: `translateX(${startPoint}px)` },
            to: { translateX: `translateX(${endPoint}px)` },
            loop: true,
            config: {
                duration: 1000,
            },
            delay: 300
        }),
        []
    )

    const skeletonContainerStyle = {
        backgroundColor: '#ccc',
        overflow: 'hidden',
        ...style
    }

    const gradientStyle = {
        width: gradientWidth,
        height: style.height,
        transform: props.translateX,
        background: 'linear-gradient(90deg, #ccc, #dedede, #ccc)'
    }

    return <AnimatedView style={skeletonContainerStyle}>
        <AnimatedView style={gradientStyle} />
    </AnimatedView>
}

export default SkeletonItem;