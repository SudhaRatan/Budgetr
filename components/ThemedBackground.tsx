import { ReactElement } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function ThemedBackground({ children, style, ...rest }: any) {
    const theme = useTheme()
    return <View style={[{ backgroundColor: theme.colors.background, flex: 1 },style]}>{children}</View>
}