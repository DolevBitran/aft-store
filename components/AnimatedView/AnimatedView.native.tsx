import { View } from 'react-native';
import { animated, useSpring, useSpringValue, Controller } from '@react-spring/native';

const AnimatedView = animated(View)

export default AnimatedView;
export { useSpring, useSpringValue, animated, Controller };