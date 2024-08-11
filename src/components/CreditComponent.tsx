import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import {
  Text,
  useTheme,
  Icon,
  MD3Theme,
} from "react-native-paper";
import { category } from "../types/dbTypes";

const CreditComponent = ({
  id,
  name,
  totalAmount,
  type,
  color,
  emoji,
}: category) => {
  const { width } = Dimensions.get("screen");
  const cardPadding = 10;
  const theme = useTheme();

  // menu
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Pressable
      style={{
        padding: 10,
        width: width / 2 - 1.5 * cardPadding,
        height: width / 2 - 1.5 * cardPadding,
        borderRadius: 10 * theme.roundness,
        backgroundColor: color ?? theme.colors.primaryContainer,
        justifyContent: "space-between",
        paddingBottom: 30,
        elevation: 1,
      }}
      onPress={openMenu}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            backgroundColor: theme.colors.surface,
            padding: 20,
            borderRadius: 100,
            color: theme.dark ? theme.colors.background : "",
          }}
        >
          {emoji}
        </Text>
        <Text
          style={{
            fontFamily: "monospace",
            color: theme.dark ? theme.colors.background : "",
          }}
        >
          {name}
        </Text>
      </View>
      {!visible ? (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              color: theme.dark
                ? theme.colors.surfaceVariant
                : theme.colors.onSurfaceDisabled,
              fontWeight: "bold",
            }}
          >
            &#8377;{" "}
          </Text>
          <Text
            variant="headlineLarge"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "monospace",
              color: theme.dark ? theme.colors.background : "",
            }}
          >
            {totalAmount}
          </Text>
        </View>
      ) : (
        <CreditComponentActions closeMenu={closeMenu} />
      )}
    </Pressable>
  );
};

export default CreditComponent;

function CreditComponentActions({closeMenu}: any) {
  const theme = useTheme()
  const style = styles(theme)
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 10,
      }}
    >
      <TouchableOpacity style={style.action} onPress={closeMenu}>
        <Icon source="close" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={style.action}>
        <Icon source="pencil" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={style.action}>
        <Icon source="delete" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme: MD3Theme) =>  StyleSheet.create({
  action: {
    padding: 15,
    backgroundColor: theme.colors.background,
    borderRadius: 100,
  }
})