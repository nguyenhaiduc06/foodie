import { Screen, Text, Space } from "@/components";
import { MainStackScreenProps } from "@/navigators";
import { theme } from "@/theme";
import { FC, useEffect } from "react";
import styled from "styled-components/native";

type ScreenProps = MainStackScreenProps<"RecipeDetails">;

const CoverImage = styled.Image`
  height: 200px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
`;

const Container = styled.View`
  padding: 16px;
`;

export const RecipeDetailsScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>Edit</Text>,
    });
  }, [navigation]);

  return (
    <Screen>
      <Container>
        <CoverImage />
        <Space height={8} />
        <Text preset="title">Recipe name</Text>
        <Space height={16} />
        <Text>Recipe name</Text>
      </Container>
    </Screen>
  );
};
