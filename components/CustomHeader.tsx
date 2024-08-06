import { router } from 'expo-router'
import { View } from 'react-native'
import { Appbar, HeadlineProps, Text } from 'react-native-paper'
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types"

interface CustomHeaderProps extends NativeStackHeaderProps {
    title: string
}

const CustomHeader = ({ title, back }: CustomHeaderProps) => {
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={() => router.back()} />}
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}

export default CustomHeader
