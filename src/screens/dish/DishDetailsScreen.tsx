import { FC, useEffect } from "react";
import styled from "styled-components/native";
import { MainStackScreenProps } from "@/navigators";
import { Screen, Text, Space } from "@/components";
import { theme } from "@/theme";
import { TouchableOpacity } from "react-native";

const DESCRIPTION_BY_MEAL = {
  breakfast: "Bữa sáng",
  lunch: "Bữa trưa",
  dinner: "Bữa tối",
};

type ScreenProps = MainStackScreenProps<"DishDetails">;

const CoverImage = styled.Image`
  height: 200px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
`;

const Container = styled.View`
  padding: 16px;
`;

export const DishDetailsScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { dish } = route.params;

  const openEditDishScreen = () => {
    navigation.navigate("UpdateDish", {
      dish,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openEditDishScreen}>
          <Text color={theme.colors.primary} weight={500}>
            Sửa
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Screen>
      <Container>
        <CoverImage source={{ uri: dish.image_url }} />
        <Space height={8} />
        <Text preset="title">{dish.name}</Text>
        <Space height={16} />
        <Text>{DESCRIPTION_BY_MEAL[dish.meal]}</Text>
      </Container>
    </Screen>
  );
};
