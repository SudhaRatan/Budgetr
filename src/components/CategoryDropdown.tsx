import {
  LayoutRectangle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { Menu, Text } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

type listIconsTypes = {
  id?: string;
  src?: string;
};

type listItemsTypes = {
  id?: string;
  title?: string;
};

type DropdownTypes = {
  parent: ReactNode;
  listItems: listItemsTypes[];
  listIcons?: listIconsTypes[];
  style?: ViewStyle[];
  itemOnPress: (id: string) => void;
};

const CategoryDropdown = ({
  parent,
  listItems,
  listIcons,
  style,
  itemOnPress,
}: DropdownTypes) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [dim, setDim] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const openMenu = () => {
    setToggle(true);
  };
  const closeMenu = () => {
    setToggle(false);
  };

  return (
    <View
      style={[{ flexDirection: "column", flex: 1 }]}
      onLayout={(e) => {
        setDim(e.nativeEvent.layout);
      }}
    >
      <TouchableOpacity onPress={openMenu}>{parent}</TouchableOpacity>
      <Menu
        style={{ transform: [{ translateY: dim!.height + 10 }] }}
        visible={toggle}
        onDismiss={closeMenu}
        anchor={
          <View
            style={{
              height: 1,
            }}
          />
        }
      >
        <FlatList
          data={listItems}
          style={{ maxHeight: 250 }}
          scrollEnabled
          renderItem={({ item }) => {
            return (
              <Menu.Item
                onPress={() => {
                  itemOnPress(item.id!);
                  closeMenu();
                }}
                leadingIcon={
                  listIcons
                    ? () => (
                        <View>
                          <Text>
                            {listIcons.find((i) => i.id == item.id)?.src}
                          </Text>
                        </View>
                      )
                    : undefined
                }
                style={{ width: dim!.width }}
                title={item.title}
              />
            );
          }}
        />
      </Menu>
    </View>
  );
};

export default CategoryDropdown;
