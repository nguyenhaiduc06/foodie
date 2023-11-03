import styled from "styled-components/native";
import { Text } from "./Text";

const Container = styled.View`
  height: 56px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

export const RecipeItem = (props) => {
  const { recipe } = props;
  return (
    <Container>
      <Text preset="title">{recipe.name}</Text>
    </Container>
  );
};
