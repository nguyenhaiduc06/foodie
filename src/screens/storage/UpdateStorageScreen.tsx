import { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Button,
  DateSelector,
  Input,
  Screen,
  Space,
  Text,
} from "../../components";
import { useStorageStore } from "../../stores";
import { MainStackScreenProps } from "@/navigators";
import dayjs from "dayjs";
import { Alert, TouchableOpacity, View } from "react-native";
import { CoverImagePicker } from "./CoverImagePicker";
import { ImageResult } from "expo-image-manipulator";
import { theme } from "@/theme";

type ScreenProps = MainStackScreenProps<"UpdateStorage">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const UpdateStorageScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { storage } = route.params;
  // @ts-ignore
  const [image, setImage] = useState<ImageResult>({ uri: storage.image_url });
  const [name, setName] = useState(storage.name);
  const [amount, setAmount] = useState(storage.amount);
  const [storedIn, setStoredIn] = useState(storage.stored_in);
  const [expireDate, setExpireDate] = useState(
    dayjs(storage.expire_date).toDate()
  );
  const [updating, setUpdating] = useState(false);
  const updateStorage = useStorageStore((s) => s.updateStorage);
  const deleteStorage = useStorageStore((s) => s.deleteStorage);

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

  const promptDelete = () => {
    Alert.alert(
      "Xóa lưu trữ",
      "Bạn có chắc muốn xóa thực phẩm này khỏi lưu trữ?",
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
      ]
    );
  };

  const submitDelete = async () => {
    await deleteStorage(storage.id);
    navigation.pop();
  };

  const submitUpdate = async () => {
    await updateStorage(storage.id, {
      name,
      amount,
      stored_in: storedIn,
      expire_date: expireDate,
      image,
    });
    navigation.pop();
  };

  const shouldDisableSubmitButton =
    name == storage.name &&
    amount == storage.amount &&
    storedIn == storage.stored_in &&
    dayjs(expireDate).isSame(dayjs(storage.expire_date)) &&
    !image.base64;
  return (
    <Screen safeBottom>
      <Container>
        <CoverImagePicker image={image} onImagePicked={setImage} />
        <Input
          placeholder="Tên"
          onChangeText={setName}
          defaultValue={storage.name}
        />
        <Input
          placeholder="Số lượng"
          onChangeText={setAmount}
          defaultValue={storage.amount}
        />
        <Input
          placeholder="Nơi cất"
          onChangeText={setStoredIn}
          defaultValue={storage.stored_in}
        />
        <View>
          <Text preset="body" weight={500}>
            Ngày hết hạn
          </Text>
          <Space height={4} />
          <DateSelector date={expireDate} onChangeDate={setExpireDate} />
        </View>
        <Space />
        <Button
          preset="primary"
          label="Cập nhật"
          disabled={shouldDisableSubmitButton}
          loading={updating}
          onPress={submitUpdate}
        />
      </Container>
    </Screen>
  );
};
