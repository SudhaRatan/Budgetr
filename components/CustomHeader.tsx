import { router } from 'expo-router'
import { View } from 'react-native'
import { Appbar, HeadlineProps, Text } from 'react-native-paper'

const CustomHeader = ({ title, back, route }: any) => {
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={() => router.back()} />}
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}

export default CustomHeader