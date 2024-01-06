import { FC, useState } from "react";
import { Button, Input, Screen, Space } from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import { useAuthStore } from "@/stores";
import { ImageResult } from "expo-image-manipulator";
import { AvatarPicker } from "./AvatarPicker";

type ScreenProps = MainStackScreenProps<"UpdateAccount">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const UpdateAccountScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const account = useAuthStore((s) => s.account);
  const [name, setName] = useState(account.name);
  const [username, setUsername] = useState(account.username);
  // @ts-ignore
  const [image, setImage] = useState<ImageResult>({ uri: account.avatar_url });
  const [updating, setUpdating] = useState(false);
  const updateAccount = useAuthStore((s) => s.updateAccount);

  const submitUpdate = async () => {
    setUpdating(true);
    await updateAccount({
      name,
      username,
      image,
    });
    setUpdating(false);
    navigation.goBack();
  };

  const shouldDisableSubmitButton =
    name == account.name && username == account.username && !image.base64;
  return (
    <Screen safeBottom>
      <Container>
        <AvatarPicker image={image} onImagePicked={setImage} />
        <Input
          placeholder="Tên"
          onChangeText={setName}
          defaultValue={account.name}
        />
        <Input
          placeholder="Tên tài khoản"
          onChangeText={setUsername}
          defaultValue={account.username}
        />
        <Space />
        <Button
          preset="primary"
          label="Cập nhật"
          onPress={submitUpdate}
          disabled={shouldDisableSubmitButton}
          loading={updating}
        />
      </Container>
    </Screen>
  );
};
