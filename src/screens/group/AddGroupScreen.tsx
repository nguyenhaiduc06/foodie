import React, { FC, useState } from "react";
import {
  Button,
  GroupMemberItem,
  Input,
  Screen,
  Space,
  Text,
} from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { ImageIcon } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore, useGroupStore } from "@/stores";
import { Alert } from "react-native";
import {
  ImageResult,
  SaveFormat,
  manipulateAsync,
} from "expo-image-manipulator";
import { api } from "@/lib/api";

type ScreenProps = MainStackScreenProps<"AddGroup">;

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

const ImagePlacholder = styled.TouchableOpacity`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 16px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 16px;
  align-self: center;
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

export const AddGroupScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [image, setImage] = useState<ImageResult>();
  const [phone, setPhone] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const createGroup = useGroupStore((s) => s.createGroup);

  const submit = async () => {
    setLoading(true);
    const { error } = await createGroup({
      name,
      image,
      members,
    });
    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    navigation.goBack();
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
    setMembers((s) => [...s, account]);
  };

  return (
    <Screen safeBottom>
      <Container>
        {image ? (
          <Image source={{ uri: image.uri }} />
        ) : (
          <ImagePlacholder onPress={pickImage}>
            <ImageIcon size={16} color={theme.colors.text} />
            <Text>Chọn ảnh</Text>
          </ImagePlacholder>
        )}
        <Input placeholder="Tên nhóm" onChangeText={setName} />
        <Text>Mời thành viên</Text>
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
        <Section>
          {members.map((member, index) => (
            <React.Fragment key={member.id}>
              {index != 0 && <Divider />}
              <GroupMemberItem account={member} editable={true} />
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
