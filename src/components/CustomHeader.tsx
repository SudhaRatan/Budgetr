import { router } from 'expo-router'
import { GestureResponderEvent, View } from 'react-native'
import { Appbar, HeadlineProps, Icon, Text } from 'react-native-paper'
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types"
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/src/types"
import { FC } from 'react'


interface CustomStackHeaderProps extends NativeStackHeaderProps {
    title?: string,
    right?: string,
    rightOnPress?: (event?: GestureResponderEvent) => void
}

interface CustomBottomTabsHeaderProps extends BottomTabHeaderProps {
    title?: string,
    right?: string,
    back?: string,
    rightOnPress?: (event?: GestureResponderEvent) => void
}

const CustomHeader = ({ title, back, right, rightOnPress }: CustomStackHeaderProps | CustomBottomTabsHeaderProps) => {
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={() => router.back()} />}
            <Appbar.Content title={title} />
            {right && <Appbar.Action icon={right} onPress={rightOnPress} />}
        </Appbar.Header>
    )
}

export default CustomHeader
