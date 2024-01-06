import { Button, Input, Screen, Space, Text } from "@/components";
import { Account, Member, supabase } from "@/lib";
import { MainStackScreenProps } from "@/navigators";
import React from "react";
import { FC, useEffect, useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { useAuthStore, useGroupStore } from "@/stores";
import { ImageResult } from "expo-image-manipulator";
import { AccountSearch } from "./AccountSearch";
import { MemberAccount } from "./MemberAccount";
import { GroupAvatar } from "./GroupAvatar";

type ScreenProps = MainStackScreenProps<"GroupDetails">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

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

export const GroupDetailsScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { group } = route.params;
  const [name, setName] = useState(group.name);
  //@ts-ignore
  const [avatar, setAvatar] = useState<ImageResult>({ uri: group.image_url });
  const [members, setMembers] = useState<Array<Member & { account: Account }>>(
    []
  );
  const [updating, setUpdating] = useState(false);
  const [fetchingMembers, setFetchingMembers] = useState(false);
  const updateGroup = useGroupStore((s) => s.updateGroup);
  const deleteGroup = useGroupStore((s) => s.deleteGroup);
  const removeMemberFromGroup = useGroupStore((s) => s.removeMemberFromGroup);
  const addMemberToGroup = useGroupStore((s) => s.addMemberToGroup);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={promptDelete}>
          <Text color={theme.colors.danger} weight={500}>
            Xóa
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchMembers();
  }, [group]);

  const submitUpdate = async () => {
    setUpdating(true);
    await updateGroup(group.id, {
      name,
      image: avatar,
    });
    setUpdating(false);
    navigation.pop();
  };

  const submitDelete = async () => {
    await deleteGroup(group.id);
    navigation.pop();
  };

  const fetchMembers = async () => {
    setFetchingMembers(true);
    const { data } = await supabase
      .from("members")
      .select("*, account:account_id(*)")
      .eq("group_id", group.id);
    //@ts-ignore
    setMembers(data);
    setFetchingMembers(false);
  };

  const deleteMember = (member: Member) => {
    Alert.alert(
      "Xóa thành viên",
      "Bạn có chắc bạn muốn xóa thành viên này khỏi nhóm",
      [
        {
          text: "Xóa",
          onPress: async () => {
            const { error } = await removeMemberFromGroup(
              member.account_id,
              member.group_id
            );
            if (error) Alert.alert(error);
            fetchMembers();
          },
          style: "destructive",
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const addMemberAccount = async (accountToAdd: Account) => {
    const account_id = useAuthStore.getState().account.id;
    if (accountToAdd.id == account_id) {
      Alert.alert(`Bạn đang là trưởng nhóm`);
      return;
    }

    await addMemberToGroup(accountToAdd.id, group.id);
    fetchMembers();
  };

  const promptDelete = () => {
    Alert.alert(
      "Xóa nhóm",
      `Bạn có chắc bạn muốn xóa nhóm ${group.name}?`,
      [
        {
          text: "Xóa",
          style: "destructive",
          onPress: submitDelete,
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <Screen safeBottom>
      <Container>
        <GroupAvatar image={avatar} onImagePicked={setAvatar} />
        <Input
          placeholder="Tên nhóm"
          defaultValue={group?.name}
          onChangeText={setName}
        />
        <Text preset="title">Thành viên</Text>
        <AccountSearch
          onAccountFound={addMemberAccount}
          searchButtonTitle="Thêm"
        />
        {fetchingMembers && <ActivityIndicator />}
        <Section>
          {members.map((member, index) => (
            <React.Fragment key={`${member.group_id}-${member.account_id}`}>
              {index != 0 && <Divider />}
              <MemberAccount
                account={member.account}
                is_admin={member.is_admin}
                onDeletePress={() => deleteMember(member)}
              />
            </React.Fragment>
          ))}
        </Section>
        <Space />
        <Button
          preset="primary"
          label="Lưu"
          loading={updating}
          disabled={name == group.name && !avatar.base64}
          onPress={submitUpdate}
        />
      </Container>
    </Screen>
  );
};
