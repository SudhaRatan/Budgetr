import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper';

interface TabIconProps {
    focused: boolean;
    color: string;
    focusedColor?: string;
    size: number;
    focusedSize?: number;
    source: string;
    focusedSource?: string;
    style?: StyleProp<ViewStyle>
}

const TabIcon = ({ color, focused, size, source, focusedColor, focusedSize, focusedSource, style }: TabIconProps) => {
    return (
        <View style={[style, {}]}>
            <Icon
                size={focusedSize ? (focused ? focusedSize : size) : size}
                source={focusedSource ? (focused ? focusedSource : source) : source}
                color={focusedColor ? (focused ? focusedColor : color) : color}
            />
        </View>
    )
}

export default TabIcon