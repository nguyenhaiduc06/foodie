import { FC, useEffect } from "react";
import styled from "styled-components/native";
import { MainStackScreenProps } from "@/navigators";
import { Screen, Text, Space } from "@/components";
import { theme } from "@/theme";
import { TouchableOpacity } from "react-native";

type ScreenProps = MainStackScreenProps<"EditDish">;

const CoverImage = styled.Image`
  height: 200px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
`;

const Container = styled.View`
  padding: 16px;
`;

export const EditDishScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { dish } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: dish.name,
      headerRight: () => (
        <TouchableOpacity>
          <Text color={theme.colors.danger} weight={500} size={18}>
            Xóa
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
        <Text>{dish.meal}</Text>
      </Container>
    </Screen>
  );
};
