import {
  Button,
  GroupMemberItem,
  Input,
  Screen,
  Space,
  Text,
} from "@/components";
import { Group, Profile, supabase } from "@/lib";
import { MainStackScreenProps } from "@/navigators";
import React from "react";
import { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { theme } from "@/theme";

type ScreenProps = MainStackScreenProps<"ManageGroup">;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.palette.black[10]};
  width: 100%;
`;

export const ManageGroupScreen: FC<ScreenProps> = (props) => {
  const { route } = props;
  const { groupId } = route.params;
  const [group, setGroup] = useState<Group & { profiles: Profile[] }>();
  const members = group?.profiles ?? [];
  useEffect(() => {
    supabase
      .from("groups")
      .select("*, profiles(*)")
      .eq("id", groupId)
      .single()
      .then(({ data, error }) => setGroup(data));
  }, [groupId]);
  return (
    <Screen style={styles.container} safeBottom>
      <Input placeholder="Group name" defaultValue={group?.name} />
      <Space height={24} />
      <Text preset="title">Thành viên</Text>
      <Space height={8} />
      <Section>
        {members.map((member, index) => (
          <React.Fragment key={member.id}>
            {index != 0 && <Divider />}
            <GroupMemberItem profile={member} />
          </React.Fragment>
        ))}
      </Section>
      <Space />
      <Button
        preset="primary"
        disabled={true}
        loading={false}
        label="Cập nhật"
      />
      <Space height={16} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
