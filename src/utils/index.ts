import React from 'react';
import { useWindowDimensions, PixelRatio, ScaledSize, Dimensions } from 'react-native'

function useScale() {

    function getOrientation(window: ScaledSize) {
        return (window.width < window.height) ? 'portrait' : 'landscape'
    }

    function getFontSizeByWindowWidth(window: ScaledSize, fontSize: number) {
        const baseWidth = 320; // width of smallest iPhone
        const width = (getOrientation(window) == 'portrait') ? window.width : window.height
        return PixelRatio.roundToNearestPixel(fontSize * (width / baseWidth));
    }

    function scale(size: number) {
        return getFontSizeByWindowWidth(useWindowDimensions(), size)
    }

    return scale;
}


function getOrientation(window: ScaledSize) {
    return (window.width < window.height) ? 'portrait' : 'landscape'
}

function getFontSizeByWindowWidth(window: ScaledSize, fontSize: number) {
    const baseWidth = 320; // width of smallest iPhone
    const width = (getOrientation(window) == 'portrait') ? window.width : window.height
    return PixelRatio.roundToNearestPixel(fontSize * (width / baseWidth));
}

export function scale(size: number) {
    return getFontSizeByWindowWidth(Dimensions.get('window'), size)
}

export const uniqueSid = () => Math.random().toString(16).slice(3)
