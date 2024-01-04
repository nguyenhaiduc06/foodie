import {
  ImageResult,
  SaveFormat,
  manipulateAsync,
} from "expo-image-manipulator";
import { FC, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { ImageIcon } from "lucide-react-native";
import { PickImageButton, Text } from "@/components";
import { theme } from "@/theme";
import { Image } from "expo-image";

type GroupAvatarProps = {
  avatar: ImageResult;
  onChangedAvatar: (avatar: ImageResult) => void;
};

const ImagePlacholder = styled.View`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 16px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled(Image)`
  height: 150px;
  width: 150px;
  border-radius: 16px;
  align-self: center;
  background-color: gray;
`;

export const GroupAvatar: FC<GroupAvatarProps> = (props) => {
  const { avatar, onChangedAvatar } = props;
  return (
    <View style={{ alignSelf: "center" }}>
      <Avatar source={{ uri: avatar?.uri }} />
      <PickImageButton
        onImagePicked={onChangedAvatar}
        style={{ position: "absolute", bottom: -4, right: -4 }}
      />
    </View>
  );
};
