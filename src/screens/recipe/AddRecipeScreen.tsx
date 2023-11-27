import { FC, useState } from "react";
import { Button, Input, Screen, Space } from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import { useRecipeStore } from "@/stores";
import { Alert } from "react-native";
import { ImageResult } from "expo-image-manipulator";
import { CoverImagePicker } from "./CoverImagePicker";

type ScreenProps = MainStackScreenProps<"AddRecipe">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
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
    const { error } = await createRecipe({
      name,
      content,
      image,
    });
    setCreating(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    navigation.goBack();
  };

  return (
    <Screen safeBottom>
      <Container>
        <CoverImagePicker image={image} onImagePicked={setImage} />
        <Input placeholder="Tên món ăn" onChangeText={setName} />
        <Input placeholder="Nội dung" onChangeText={setContent} />
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
