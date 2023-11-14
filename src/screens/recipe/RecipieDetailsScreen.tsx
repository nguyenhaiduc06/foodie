import { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import { MainStackScreenProps } from "@/navigators";
import { Screen, Text } from "@/components";
import { theme } from "@/theme";
import { CoverImagePicker } from "./CoverImagePicker";
import { ImageResult } from "expo-image-manipulator";

type ScreenProps = MainStackScreenProps<"RecipeDetails">;

const CoverImage = styled.Image`
  height: 200px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
`;

const Container = styled.View`
  padding: 16px;
  gap: 16px;
`;

export const RecipeDetailsScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { recipe } = route.params;
  // @ts-ignore
  const [image, setImage] = useState<ImageResult>({ uri: recipe.image_url });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>Edit</Text>,
    });
  }, [navigation]);

  return (
    <Screen>
      <Container>
        <CoverImagePicker image={image} onImagePicked={setImage} />
        <Text preset="title">{recipe.name}</Text>
        <Text>{recipe.content}</Text>
      </Container>
    </Screen>
  );
};
