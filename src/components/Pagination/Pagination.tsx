import React from "react";
import { Pressable, View, Animated, ViewStyle } from "react-native";


const parentContainer = (
    height: number,
    paginataionBackgroundColor: string
): ViewStyle => {
    return {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: paginataionBackgroundColor,
        height: height, //only needed when height is dynamically set for each pagination item
    };
};

const buttonContainer = (paddingHorizontal: number): ViewStyle => {
    return {
        paddingHorizontal,
    };
};

const buttonStyle = (
    indicatorWidth: Animated.AnimatedInterpolation<string | number>,
    indicatorHeight: Animated.AnimatedInterpolation<string | number>,
    backgroundColor: Animated.AnimatedInterpolation<string | number>,
    borderRadius: number
): Animated.Animated => {
    return {
        width: indicatorWidth,
        height: indicatorHeight,
        borderRadius,
        marginHorizontal: 3,
        backgroundColor,
    };
};

export const styles = {
    parentContainer,
    buttonContainer,
    buttonStyle,
};


const Pagination = (props: PaginationProps) => {
    return (
        <>
            <View
                style={styles.parentContainer(
                    props.indicatorHeight ? props.indicatorHeight[1] + 5 : 20,
                    props.paginataionBackgroundColor
                )}
            >
                {props.data.map((_, idx) => {
                    const inputRange = [
                        (idx - 1) * props.itemWidth,
                        idx * props.itemWidth,
                        (idx + 1) * props.itemWidth,
                    ];
                    const indicatorWidth = props.scrollX.interpolate({
                        inputRange,
                        outputRange: props.indicatorWidth,
                        extrapolate: "clamp",
                    });
                    const indicatorHeight = props.scrollX.interpolate({
                        inputRange,
                        outputRange: props.indicatorHeight,
                        extrapolate: "clamp",
                    });
                    const backgroundColor = props.scrollX.interpolate({
                        inputRange,
                        outputRange: props.indicatorColor,
                        extrapolate: "clamp",
                    });
                    return (
                        <Pressable
                            key={idx}
                            testID={`pagination-indicator-${idx}`}
                            onPress={() => props.getIndex(idx)}
                            style={styles.buttonContainer(props.indicatorHorizontalPadding)}
                        >
                            <Animated.View
                                key={idx.toString()}
                                style={styles.buttonStyle(
                                    indicatorWidth,
                                    indicatorHeight,
                                    backgroundColor,
                                    props.inidicatorBorderRadius
                                )}
                            />
                        </Pressable>
                    );
                })}
            </View>
        </>
    );
};

export default Pagination;