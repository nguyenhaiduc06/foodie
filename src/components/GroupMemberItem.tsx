import { theme } from "@/theme";
import styled from "styled-components/native";
import { Text } from "./Text";
import { Delete, DeleteIcon, Trash, Trash2 } from "lucide-react-native";
import { Space } from "./Space";

const Container = styled.View`
  height: 56px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
`;

const Icon = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.palette.black[10]};
  align-items: center;
  justify-content: center;
`;
export const GroupMemberItem = () => {
  return (
    <Container>
      <Icon />
      <Text>Nguyen Hai Duc</Text>
      <Space />
      <Trash2 size={20} color={theme.colors.danger} />
    </Container>
  );
};
