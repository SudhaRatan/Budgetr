import { Dimensions, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Text, useTheme, Menu, Button, Divider } from "react-native-paper";
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
    <TouchableOpacity
      activeOpacity={0.5}
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
            color: theme.dark ? theme.colors.background: '',
          }}
        >
          {emoji}
        </Text>
        <Text
          style={{ fontFamily: "monospace", color: theme.dark ? theme.colors.background: '',  }}
        >
          {name}
        </Text>
      </View>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
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
                color: theme.dark ? theme.colors.surfaceVariant: theme.colors.onSurfaceDisabled,
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
                color: theme.dark ? theme.colors.background: '',
              }}
            >
              {totalAmount}
            </Text>
          </View>
        }
      >
        <Menu.Item onPress={() => {}} title="Edit" leadingIcon="pencil" />
        <Menu.Item onPress={() => {}} title="Delete" leadingIcon="delete" />
      </Menu>
    </TouchableOpacity>
  );
};

export default CreditComponent;
