import { FC, useState } from "react";
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
import { Alert, View } from "react-native";
import { CoverImagePicker } from "./CoverImagePicker";
import { ImageResult } from "expo-image-manipulator";

type ScreenProps = MainStackScreenProps<"AddStorage">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const AddStorageScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [image, setImage] = useState<ImageResult>();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [storedIn, setStoredIn] = useState("");
  const [expireDate, setExpireDate] = useState(dayjs().toDate());
  const [loading, setLoading] = useState(false);
  const createStorate = useStorageStore((s) => s.createStorage);

  const submit = async () => {
    createStorate({
      name,
      amount,
      storedIn,
      expireDate,
    });
    navigation.pop();
  };
  return (
    <Screen safeBottom>
      <Container>
        <CoverImagePicker image={image} onImagePicked={setImage} />
        <Input placeholder="Tên" onChangeText={setName} />
        <Input placeholder="Số lượng" onChangeText={setAmount} />
        <Input placeholder="Nơi cất" onChangeText={setStoredIn} />
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
          label="Thêm"
          disabled={!name || !amount}
          loading={loading}
          onPress={submit}
        />
      </Container>
    </Screen>
  );
};
