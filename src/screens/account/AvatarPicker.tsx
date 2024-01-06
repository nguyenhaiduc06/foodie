import {
  ImageResult,
  SaveFormat,
  manipulateAsync,
} from "expo-image-manipulator";
import { FC } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { ImageIcon } from "lucide-react-native";
import { Text } from "@/components";
import { theme } from "@/theme";
import { Image as ExpoImage } from "expo-image";

type AvatarPickerProps = {
  base64?: string;
  image: ImageResult;
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

const Image = styled(ExpoImage)`
  height: 150px;
  width: 150px;
  border-radius: 16px;
  align-self: center;
`;

export const AvatarPicker: FC<AvatarPickerProps> = (props) => {
  const { image, onImagePicked } = props;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});

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
      {image && image.uri ? (
        <Image source={{ uri: image.uri }} />
      ) : (
        <ImagePlacholder>
          <ImageIcon size={16} color={theme.colors.text} />
          <Text>Chọn ảnh</Text>
        </ImagePlacholder>
      )}
    </TouchableOpacity>
  );
};
