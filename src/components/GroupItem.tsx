import { theme } from "@/theme";
import styled from "styled-components/native";
import { Text } from "./Text";
import { View } from "react-native";

const Container = styled.View`
  height: 72px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
`;

const Icon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${theme.palette.black[10]};
  align-items: center;
  justify-content: center;
`;
export const GroupItem = () => {
  return (
    <Container>
      <Icon>
        <Text preset="body">🍔</Text>
      </Icon>
      <View>
        <Text preset="title">Group</Text>
        <Text preset="body">5 members</Text>
      </View>
    </Container>
  );
};
