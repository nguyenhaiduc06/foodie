import {
  ImageResult,
  SaveFormat,
  manipulateAsync,
} from "expo-image-manipulator";
import { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { ImageIcon } from "lucide-react-native";
import { Text } from "@/components";
import { theme } from "@/theme";
import { Image } from "expo-image";

type GroupAvatarPickerProps = {
  avatar: ImageResult;
  onImagePicked: (image: ImageResult) => void;
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
`;

export const AvatarPicker: FC<GroupAvatarPickerProps> = (props) => {
  const { avatar, onImagePicked } = props;
  const pickImage = async () => {
    console.log("pick image");
    let result = await ImagePicker.launchImageLibraryAsync({});
    console.log({ result });

    if (!result.canceled) {
      const imageManip = await manipulateAsync(
        result.assets[0].uri,
        [
          {
            resize: {
              width: 300,
            },
          },
        ],
        {
          base64: true,
          compress: 0,
          format: SaveFormat.PNG,
        }
      );
      onImagePicked(imageManip);
    }
  };
  return (
    <TouchableOpacity onPress={pickImage}>
      {avatar ? (
        <Avatar source={{ uri: avatar.uri }} />
      ) : (
        <ImagePlacholder>
          <ImageIcon size={16} color={theme.colors.text} />
          <Text>Chọn ảnh</Text>
        </ImagePlacholder>
      )}
    </TouchableOpacity>
  );
};
