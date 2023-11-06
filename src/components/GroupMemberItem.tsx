import { theme } from "@/theme";
import styled from "styled-components/native";
import { Text } from "./Text";
import { Delete, DeleteIcon, Trash, Trash2 } from "lucide-react-native";
import { Space } from "./Space";
import { Profile } from "@/lib";
import { FC } from "react";

type GroupMemberItemProps = {
  profile: Profile;
};

const Container = styled.View`
  height: 56px;
  border-radius: 16px;
  padding: 0 16px;
  gap: 8px;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.palette.black[10]};
  align-items: center;
  justify-content: center;
`;
export const GroupMemberItem: FC<GroupMemberItemProps> = (props) => {
  const { profile } = props;
  return (
    <Container>
      <Icon />
      <Text>{profile.name}</Text>
      <Space />
      <Trash2 size={20} color={theme.colors.danger} />
    </Container>
  );
};
