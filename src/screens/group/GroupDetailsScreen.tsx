import {
  Button,
  GroupMemberItem,
  Input,
  Screen,
  Space,
  Text,
} from "@/components";
import { Account, Group, Profile, supabase } from "@/lib";
import { MainStackScreenProps } from "@/navigators";
import React from "react";
import { FC, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { theme } from "@/theme";

type ScreenProps = MainStackScreenProps<"GroupDetails">;

const Container = styled.View`
  padding: 16px;
  gap: 16px;
`;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
`;

const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 16px;
  background-color: ${theme.palette.black[10]};
  align-self: center;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.palette.black[10]};
  width: 100%;
`;

export const GroupDetailsScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { groupId } = route.params;
  const [allowEditing, setAllowEditing] = useState(false);
  const [group, setGroup] = useState<Group & { accounts: Account[] }>();
  const members = group?.accounts ?? [];
  useEffect(() => {
    supabase
      .from("groups")
      .select("*, accounts(*)")
      .eq("id", groupId)
      .single()
      .then(({ data, error }) => setGroup(data));
  }, [groupId]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleEdit}>
          <Text weight={500} size={16} color={theme.colors.primary}>
            {allowEditing ? "Xong" : "Sửa"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, allowEditing]);

  const handleEdit = () => {
    if (allowEditing) {
      setAllowEditing(false);
    } else {
      setAllowEditing(true);
    }
  };

  const selectImage = () => {};

  const markMemberToRemove = () => {};

  return (
    <Screen safeBottom>
      <Container>
        <TouchableOpacity disabled={!allowEditing} onPress={selectImage}>
          <Image source={{ uri: group?.image_url }} />
        </TouchableOpacity>
        <Input
          placeholder="Group name"
          defaultValue={group?.name}
          editable={allowEditing}
        />
        <Text preset="title">Thành viên</Text>
        <Section>
          {members.map((member, index) => (
            <React.Fragment key={member.id}>
              {index != 0 && <Divider />}
              <GroupMemberItem account={member} editable={allowEditing} />
            </React.Fragment>
          ))}
        </Section>
      </Container>
    </Screen>
  );
};
