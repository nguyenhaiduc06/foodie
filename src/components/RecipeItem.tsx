import styled from "styled-components/native";
import { Text } from "./Text";
import { Recipe } from "@/lib";
import { FC } from "react";
import { theme } from "@/theme";
import { Space } from "./Space";

type RecipeItemProps = {
  recipe: Recipe;
  size: number;
};

const Container = styled.View<{ size: number }>`
  height: ${(p) => p.size}px;
  width: ${(p) => p.size}px;
  padding: 10px;
  background-color: white;
  border-radius: 12px;
  align-items: start;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
`;

const Image = styled.Image<{ width: number; height: number }>`
  flex: 1;
  width: 100%;
  border-radius: 4px;
  background-color: ${theme.colors.foreground};
`;

export const RecipeItem: FC<RecipeItemProps> = (props) => {
  const { recipe, size } = props;
  return (
    <Container size={size}>
      <Image source={{ uri: recipe.image_url }} width={size} height={size} />
      <Space height={12} />
      <Text weight={500}>{recipe.name}</Text>
    </Container>
  );
};
