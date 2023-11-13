import {
  Button,
  GroupMemberItem,
  Input,
  Screen,
  Space,
  Text,
} from "@/components";
import { Account, Member, supabase } from "@/lib";
import { MainStackScreenProps } from "@/navigators";
import React from "react";
import { FC, useEffect, useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { useAuthStore, useGroupStore } from "@/stores";
import {
  ImageResult,
  SaveFormat,
  manipulateAsync,
} from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { api } from "@/lib/api";

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
  const [image, setImage] = useState<ImageResult>();
  const [members, setMembers] = useState<Array<Member & { account: Account }>>(
    []
  );
  const [phone, setPhone] = useState("");
  const [updating, setUpdating] = useState(false);
  const [fetchingMembers, setFetchingMembers] = useState(false);
  const updateGroup = useGroupStore((s) => s.updateGroup);
  const removeMember = useGroupStore((s) => s.removeMember);
  const addMember = useGroupStore((s) => s.addMemberToGroup);

  useEffect(() => {
    fetchMembers();
  }, [group]);

  const submit = async () => {
    setUpdating(true);
    const { error } = await updateGroup(group, {
      newName: name,
      newImage: image,
    });
    setUpdating(false);
    if (error) {
      Alert.alert(error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});

    if (!result.canceled) {
      const imageManip = await manipulateAsync(
        result.assets[0].uri,
        [
          {
            resize: {
              width: 300,
            },
          },
        ],
        {
          base64: true,
          compress: 0,
          format: SaveFormat.PNG,
        }
      );
      setImage(imageManip);
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

  const findAndAddMember = async () => {
    const account = await api.getAccount({ phone });
    if (!account) {
      Alert.alert(`Không tìm thấy người dùng có số điện thoại ${phone}`);
      return;
    }
    const account_id = useAuthStore.getState().account.id;
    if (account.id == account_id) {
      Alert.alert(`Bạn đang là trưởng nhóm`);
      return;
    }

    await addMember(group, account);
    fetchMembers();
  };

  return (
    <Screen safeBottom>
      <Container>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: image?.uri ?? group?.image_url }} />
        </TouchableOpacity>
        <Input
          placeholder="Tên nhóm"
          defaultValue={group?.name}
          onChangeText={setName}
        />
        <Text preset="title">Thành viên</Text>
        <Row>
          <Input
            placeholder="Số điện thoại"
            onChangeText={setPhone}
            containerStyle={{ flex: 1 }}
            autoCapitalize="none"
          />
          <AddMemberButton onPress={findAndAddMember}>
            <Text color={theme.colors.textInverted}>Thêm</Text>
          </AddMemberButton>
        </Row>
        {fetchingMembers && <ActivityIndicator />}
        <Section>
          {members.map((member, index) => (
            <React.Fragment key={`${member.group_id}-${member.account_id}`}>
              {index != 0 && <Divider />}
              <GroupMemberItem
                group={group}
                member={member}
                showDeleteButton={true}
                onDeletePress={handleDeleteMemberPress}
              />
            </React.Fragment>
          ))}
        </Section>
        <Space />
        <Button
          preset="primary"
          label="Lưu"
          loading={updating}
          disabled={name == group.name && !image}
          onPress={submit}
        />
      </Container>
    </Screen>
  );
};
