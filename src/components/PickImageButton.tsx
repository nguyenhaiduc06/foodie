import {
  ImageResult,
  SaveFormat,
  manipulateAsync,
} from "expo-image-manipulator";
import { FC } from "react";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { Camera } from "lucide-react-native";
import { theme } from "@/theme";
import { TouchableOpacityProps } from "react-native";

type PickImageButtonProps = TouchableOpacityProps & {
  onImagePicked: (image: ImageResult) => void;
};

const Button = styled.TouchableOpacity`
  height: 32px;
  width: 32px;
  border-radius: 100%;
  border: 1px solid black;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const PickImageButton: FC<PickImageButtonProps> = (props) => {
  const { onImagePicked, ...rest } = props;
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
    <Button onPress={pickImage} {...rest}>
      <Camera size={20} color={theme.colors.text} />
    </Button>
  );
};
