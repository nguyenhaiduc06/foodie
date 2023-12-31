import { FC, useEffect, useState } from "react";
import { Button, Input, Screen, Space, Text } from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import { useRecipeStore } from "@/stores";
import { Alert, TouchableOpacity } from "react-native";
import { ImageResult } from "expo-image-manipulator";
import { CoverImagePicker } from "./CoverImagePicker";
import { theme } from "@/theme";

type ScreenProps = MainStackScreenProps<"UpdateRecipe">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const UpdateRecipeScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { recipe } = route.params;
  const [name, setName] = useState(recipe.name);
  const [content, setContent] = useState(recipe.content);
  // @ts-ignore
  const [image, setImage] = useState<ImageResult>({ uri: recipe.image_url });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={promptDelete}>
          <Text color={theme.colors.danger} weight={500}>
            Xóa
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  const promptDelete = () => {
    Alert.alert(
      "Xóa công thức nấu ăn",
      "Bạn có chắc muốn xóa công thức nấu ăn này?",
      [
        {
          text: "Xóa",
          style: "destructive",
          onPress: submitDelete,
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ]
    );
  };

  const submitDelete = async () => {
    setDeleting(true);
    await deleteRecipe(recipe.id);
    setDeleting(false);
    navigation.pop();
  };

  const submitUpdate = async () => {
    setUpdating(true);
    await updateRecipe(recipe.id, {
      name,
      content,
      image,
    });
    setUpdating(false);
    navigation.pop();
  };

  const shouldDisableSubmitButton =
    name == recipe.name && content == recipe.content && !image.base64;

  return (
    <Screen safeBottom>
      <Container>
        <CoverImagePicker image={image} onImagePicked={setImage} />
        <Input
          placeholder="Tên món ăn"
          defaultValue={recipe.name}
          onChangeText={setName}
        />
        <Input
          placeholder="Nội dung"
          defaultValue={recipe.content}
          onChangeText={setContent}
          multiline
        />
        <Space />
        <Button
          preset="primary"
          label="Cập nhật"
          onPress={submitUpdate}
          disabled={shouldDisableSubmitButton}
          loading={updating}
        />
        {/* <Button
          preset="secondary"
          label="Xóa"
          onPress={submitDelete}
          disabled={updating}
          loading={deleting}
        /> */}
      </Container>
    </Screen>
  );
};
