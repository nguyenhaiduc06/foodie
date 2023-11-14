import { Button, Input, Screen, Space, Text } from "@/components";
import { Account, Member, supabase } from "@/lib";
import { MainStackScreenProps } from "@/navigators";
import React from "react";
import { FC, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { useAuthStore, useGroupStore } from "@/stores";
import { ImageResult } from "expo-image-manipulator";
import { Image } from "expo-image";
import { AvatarPicker } from "./AvatarPicker";
import { AccountSearch } from "./AccountSearch";
import { MemberAccount } from "./MemberAccount";

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

const Avatar = styled(Image)`
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

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const AddMemberButton = styled.TouchableOpacity`
  height: 56px;
  border-radius: 16px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

export const GroupDetailsScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { group } = route.params;
  const [name, setName] = useState(group.name);
  const [avatar, setAvatar] = useState<ImageResult>();
  const [members, setMembers] = useState<Array<Member & { account: Account }>>(
    []
  );
  const [updating, setUpdating] = useState(false);
  const [fetchingMembers, setFetchingMembers] = useState(false);
  const updateGroup = useGroupStore((s) => s.updateGroup);
  const removeMember = useGroupStore((s) => s.removeMember);
  const addMember = useGroupStore((s) => s.addMember);

  useEffect(() => {
    fetchMembers();
  }, [group]);

  const submit = async () => {
    setUpdating(true);
    const { error } = await updateGroup(group, {
      newName: name,
      newImage: avatar,
    });
    setUpdating(false);
    if (error) {
      Alert.alert(error.message);
    }
  };

  const fetchMembers = async () => {
    setFetchingMembers(true);
    const { data } = await supabase
      .from("members")
      .select("*, account:account_id(*)")
      .eq("group_id", group.id);
    setMembers(data);
    setFetchingMembers(false);
  };

  const handleDeleteMemberPress = (member: Member) => {
    Alert.alert(
      "Xóa thành viên",
      "Bạn có chắc bạn muốn xóa thành viên này khỏi nhóm",
      [
        {
          text: "Xóa",
          onPress: () => {
            removeMember(member)
              .then(fetchMembers)
              .catch((e) => Alert.alert(e.message));
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

    await addMember(accountToAdd, group);
    fetchMembers();
  };

  return (
    <Screen safeBottom>
      <Container>
        <AvatarPicker avatar={avatar} onImagePicked={setAvatar} />
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
                onDeletePress={() => handleDeleteMemberPress(member)}
              />
            </React.Fragment>
          ))}
        </Section>
        <Space />
        <Button
          preset="primary"
          label="Lưu"
          loading={updating}
          disabled={name == group.name && !avatar}
          onPress={submit}
        />
      </Container>
    </Screen>
  );
};
