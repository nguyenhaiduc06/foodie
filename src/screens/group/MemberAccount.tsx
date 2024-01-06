import { theme } from "@/theme";
import styled from "styled-components/native";
import { Trash2 } from "lucide-react-native";
import { Space, Text } from "@/components";
import { Account, Group, Member } from "@/lib";
import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";

const LABEL_BY_STATUS = {
  admin: "Trưởng nhóm",
  member: "Thành viên",
};

const BACKGROUND_COLOR_BY_STATUS = {
  admin: theme.palette.green[100],
  invited: theme.palette.yellow[100],
};

type AccountInviteItemProps = {
  account: Account;
  is_admin: boolean;
  onDeletePress: (account: Account) => void;
};

const Container = styled.View`
  height: 56px;
  border-radius: 16px;
  padding: 0 16px;
  gap: 8px;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.palette.black[10]};
  align-items: center;
  justify-content: center;
`;

const StatusContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${(p) => p.backgroundColor};
  padding: 2px 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const MemberStatus = ({ status }) => {
  const label = LABEL_BY_STATUS[status];
  const backgroundColor = BACKGROUND_COLOR_BY_STATUS[status];
  return (
    // <StatusContainer backgroundColor={backgroundColor}>
    <Text
      size={13}
      weight={500}
      color={
        status == "admin" ? theme.colors.success : theme.palette.amber[500]
      }
    >
      {label}
    </Text>
    // </StatusContainer>
  );
};

export const MemberAccount: FC<AccountInviteItemProps> = (props) => {
  const { account, is_admin, onDeletePress } = props;
  return (
    <Container>
      <Avatar source={{ uri: account?.avatar_url ?? null }} />
      <Text>{account.name}</Text>
      <Space />
      <MemberStatus status={is_admin ? "admin" : "member"} />
      <TouchableOpacity
        onPress={() => onDeletePress(account)}
        disabled={is_admin}
      >
        <Trash2
          size={20}
          color={is_admin ? theme.colors.textDim : theme.colors.danger}
        />
      </TouchableOpacity>
    </Container>
  );
};
