import { Text } from 'react-native'
import React from 'react'

interface TabLabelProps {
    focused: boolean;
    color: string;
    focusedColor?: string;
    position?: import("@react-navigation/bottom-tabs/lib/typescript/src/types").LabelPosition;
    children: string;
}

const TabLabel = ({ color, focused, position, focusedColor, children }: TabLabelProps) => {
    return (
        <Text
            style={{ color: focusedColor ? (focused ? focusedColor : color) : color }}
        >{children}</Text>
    )
}

export default TabLabel