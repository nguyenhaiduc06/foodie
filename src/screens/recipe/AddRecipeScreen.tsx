import { FC, useState } from "react";
import { TextInput as RNInput } from "react-native";
import { Button, Input, Screen, Space } from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import { useRecipeStore } from "@/stores";
import { Alert } from "react-native";
import { ImageResult } from "expo-image-manipulator";
import { CoverImagePicker } from "./CoverImagePicker";
import { theme } from "@/theme";

type ScreenProps = MainStackScreenProps<"AddRecipe">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

const MultilineInput = styled.TextInput`
  font-size: 16px;
  height: 56px;
  font-family: "Inter_500Medium";
  color: ${theme.colors.text};
  flex: 1;
`;

export const AddRecipeScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<ImageResult>();
  const [creating, setCreating] = useState(false);
  const createRecipe = useRecipeStore((s) => s.createRecipe);

  const submitCreate = async () => {
    setCreating(true);
    createRecipe({
      name,
      content,
      image,
    });
    setCreating(false);
    navigation.goBack();
  };

  return (
    <Screen safeBottom>
      <Container>
        <CoverImagePicker image={image} onImagePicked={setImage} />
        <Input placeholder="Tên món ăn" onChangeText={setName} />
        <Input placeholder="Nội dung" onChangeText={setContent} multiline />
        <Space />
        <Button
          preset="primary"
          label="Thêm"
          onPress={submitCreate}
          disabled={!name || !content}
          loading={creating}
        />
      </Container>
    </Screen>
  );
};
