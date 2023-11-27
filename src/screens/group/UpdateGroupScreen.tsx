import React, { FC, useState } from "react";
import { Button, Input, Screen, Space, Text } from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { useAuthStore, useGroupStore } from "@/stores";
import { Alert } from "react-native";
import { ImageResult } from "expo-image-manipulator";
import { Account } from "@/lib";
import { AccountSearch } from "./AccountSearch";
import { AvatarPicker } from "./AvatarPicker";
import { MemberAccount } from "./MemberAccount";

type ScreenProps = MainStackScreenProps<"UpdateGroup">;

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

export const UpdateGroupScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<ImageResult>();
  const [memberAccounts, setMemberAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const createGroup = useGroupStore((s) => s.createGroup);

  const submit = async () => {
    setLoading(true);
    const { error } = await createGroup({
      name,
      image: avatar,
      memberAccounts,
    });
    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    navigation.goBack();
  };

  const addMemberAccount = async (accountToAdd: Account) => {
    const account_id = useAuthStore.getState().account.id;
    if (accountToAdd.id == account_id) {
      Alert.alert(`Bạn đang là trưởng nhóm`);
      return;
    }
    setMemberAccounts((s) => [...s, accountToAdd]);
  };

  const removeMemberAccount = async (accountToRemove: Account) => {
    setMemberAccounts((s) =>
      s.filter((account) => account.id != accountToRemove.id)
    );
  };

  return (
    <Screen safeBottom>
      <Container>
        <AvatarPicker avatar={avatar} onImagePicked={setAvatar} />
        <Input placeholder="Tên nhóm" onChangeText={setName} />
        <Text preset="title">Mời thành viên</Text>
        <AccountSearch
          onAccountFound={addMemberAccount}
          searchButtonTitle="Thêm"
        />
        <Section>
          {memberAccounts.map((account, index) => (
            <React.Fragment key={account.id}>
              {index != 0 && <Divider />}
              <MemberAccount
                account={account}
                onDeletePress={removeMemberAccount}
              />
            </React.Fragment>
          ))}
        </Section>
        <Space />
        <Button
          preset="primary"
          label="Tạo nhóm"
          onPress={submit}
          disabled={!name}
          loading={loading}
        />
      </Container>
    </Screen>
  );
};
