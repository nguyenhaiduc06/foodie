import { FC } from "react";
import styled from "styled-components/native";
import { Dish } from "@/lib";
import { Text } from "./Text";

type DishItemProps = {
  dish: Dish;
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 8px;
`;

export const DishItem: FC<DishItemProps> = (props) => {
  const { dish } = props;
  return (
    <Container>
      <Text preset="title">{dish.name}</Text>
    </Container>
  );
};
