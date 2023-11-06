import { GroupItem, Screen } from "@/components";
import { useGroupStore } from "@/stores/groupStore";
import { useEffect } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const SelectGroupScreen = () => {
  const groups = useGroupStore((s) => s.groups);
  const fetchGroups = useGroupStore((s) => s.fetchGroups);
  const currentGroup = useGroupStore((s) => s.currentGroup);
  const activateGroup = useGroupStore((s) => s.activateGroup);

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
      </Container>
    </Screen>
  );
};
