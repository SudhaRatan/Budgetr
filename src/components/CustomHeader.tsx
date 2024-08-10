import { router } from "expo-router";
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Avatar, HeadlineProps, Icon, Text } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/src/types";
import { FC } from "react";

interface CustomStackHeaderProps extends NativeStackHeaderProps {
  title?: string;
  right?: string;
  avatarSrc?: string;
  avatarSize?: number;
  rightOnPress?: (event?: GestureResponderEvent) => void;
  avatarOnPress?: (event?: GestureResponderEvent) => void;
}

interface CustomBottomTabsHeaderProps extends BottomTabHeaderProps {
  title?: string;
  right?: string;
  back?: string;
  avatarSrc?: string;
  avatarSize?: number;
  rightOnPress?: (event?: GestureResponderEvent) => void;
  avatarOnPress?: (event?: GestureResponderEvent) => void;
}

const CustomHeader = ({
  title,
  back,
  right,
  avatarSrc,
  avatarSize,
  avatarOnPress,
  rightOnPress,
}: CustomStackHeaderProps | CustomBottomTabsHeaderProps) => {
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={() => router.back()} />}
      <Appbar.Content title={title} />
      {right && <Appbar.Action icon={right} onPress={rightOnPress} />}
      {avatarSrc && (
        <TouchableOpacity onPress={avatarOnPress}>
          <Avatar.Icon
            size={avatarSize}
            icon={() => (
              <Image
                width={avatarSize}
                height={avatarSize}
                source={{
                  uri: avatarSrc,
                }}
                style={{ borderRadius: 100 }}
              />
            )}
          />
        </TouchableOpacity>
      )}
    </Appbar.Header>
  );
};

export default CustomHeader;
