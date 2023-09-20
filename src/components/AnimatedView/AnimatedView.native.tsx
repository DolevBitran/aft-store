import { View } from 'react-native';
import { animated, useSpring } from '@react-spring/native';

const AnimatedView = animated(View)

export default AnimatedView;
export { useSpring, animated };