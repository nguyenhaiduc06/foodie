import styled from "styled-components/native";
import { Text } from "./Text";

const Container = styled.View`
  height: 56px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

export const RecipeItem = () => {
  return (
    <Container>
      <Text preset="title">Cơm rang thập cẩm</Text>
    </Container>
  );
};
