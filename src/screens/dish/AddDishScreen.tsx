import { FC, useState } from "react";
import {
  Button,
  DateSelector,
  Input,
  Options,
  Screen,
  Space,
  Text,
} from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { ImageIcon } from "lucide-react-native";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import { useDishStore } from "@/stores";
import { Alert } from "react-native";
import { ImageResult, SaveFormat, manipulateAsync } from "expo-image-manipulator";

type ScreenProps = MainStackScreenProps<"AddDish">;

const MEAL_OPTIONS = [
  { value: "breakfast", label: "Bữa sáng" },
  { value: "lunch", label: "Bữa trưa" },
  { value: "dinner", label: "Bữa tối" },
];

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

const ImagePlacholder = styled.TouchableOpacity`
  height: 200px;
  width: 100%;
  border-radius: 16px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  height: 200px;
  width: 100%;
  border-radius: 16px;
`;

export const AddDishScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [meal, setMeal] = useState("breakfast");
  const [date, setDate] = useState(dayjs().toDate());
  const [image, setImage] = useState<ImageResult>();
  const [loading, setLoading] = useState(false);
  const createDish = useDishStore((s) => s.createDish);
  
  const submit = async () => {
    setLoading(true);
    const { error } = await createDish({
      name,
      date,
      image,
      meal,
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
      const imageManip = await manipulateAsync(result.assets[0].uri, [{resize: {
        width: 300,
      }}], {
        base64: true,
        compress: 0,
        format: SaveFormat.PNG,
      });
      setImage(imageManip);
    }
  };
  return (
    <Screen safeBottom>
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
        {image ? (
          <Image source={{ uri: image.uri }} />
        ) : (
          <ImagePlacholder onPress={pickImage}>
            <ImageIcon size={16} color={theme.colors.text} />
            <Text>Chọn ảnh</Text>
          </ImagePlacholder>
        )}

        <Input placeholder="Tên món ăn" onChangeText={setName} />
        <Options
          options={MEAL_OPTIONS}
          selectedValue={meal}
          onChangeValue={setMeal}
        />
        <Space />
        <Button
          preset="primary"
          label="Thêm"
          onPress={submit}
          disabled={!name || !date || !meal}
          loading={loading}
        />
      </Container>
    </Screen>
  );
};
