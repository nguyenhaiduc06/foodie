import { GroupItem, Screen, Text } from "@/components";
import { MainStackScreenProps } from "@/navigators";
import { useGroupStore } from "@/stores/groupStore";
import { theme } from "@/theme";
import { Plus } from "lucide-react-native";
import { FC, useEffect } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

const AddGroupButton = styled.TouchableOpacity`
  height: 72px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const ListGroupsScreen: FC<MainStackScreenProps<"ListGroups">> = (
  props
) => {
  const { navigation } = props;
  const groups = useGroupStore((s) => s.groups);
  const fetchGroups = useGroupStore((s) => s.fetchGroups);
  const currentGroup = useGroupStore((s) => s.currentGroup);
  const activateGroup = useGroupStore((s) => s.activateGroup);

  const addGroup = () => {
    navigation.navigate("AddGroup");
  };

  return (
    <Screen safeBottom>
      <Container>
        {groups.map((group) => (
          <GroupItem
            key={group.id}
            active={group.id == currentGroup.id}
            group={group}
            onSelect={activateGroup}
          />
        ))}
        <AddGroupButton onPress={addGroup}>
          <Plus size={20} color={theme.colors.text} />
          <Text>Tạo nhóm mới</Text>
        </AddGroupButton>
      </Container>
    </Screen>
  );
};
