import { theme } from "@/theme";
import styled from "styled-components/native";
import { Text } from "./Text";
import { Trash2 } from "lucide-react-native";
import { Space } from "./Space";
import { Account, Group, Member } from "@/lib";
import { FC } from "react";
import { TouchableOpacity } from "react-native";

const LABEL_BY_STATUS = {
  admin: "Trưởng nhóm",
  invited: "Đã gửi lời mời",
};

const BACKGROUND_COLOR_BY_STATUS = {
  admin: theme.palette.green[100],
  invited: theme.palette.yellow[100],
};

type GroupMemberItemProps = {
  group: Group;
  member: Member & { account: Account };
  showDeleteButton: boolean;
  onDeletePress: (member: unknown) => void;
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
    <StatusContainer backgroundColor={backgroundColor}>
      <Text size={13} weight={500}>
        {label}
      </Text>
    </StatusContainer>
  );
};

export const GroupMemberItem: FC<GroupMemberItemProps> = (props) => {
  const { group, member, showDeleteButton, onDeletePress } = props;
  const { is_admin, status } = member;
  return (
    <Container>
      <Icon />
      <Text>{member.account.name}</Text>
      <Space />
      <MemberStatus status={is_admin ? "admin" : status} />
      {showDeleteButton && (
        <TouchableOpacity onPress={() => onDeletePress(member)}>
          <Trash2 size={20} color={theme.colors.danger} />
        </TouchableOpacity>
      )}
    </Container>
  );
};
