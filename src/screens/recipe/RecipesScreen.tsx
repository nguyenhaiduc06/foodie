import React, { FC } from "react";
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import { Screen, RecipeItem, Input, Space } from "@/components";
import { theme } from "@/theme";
import { useRecipeStore } from "@/stores";

const SCREEN_PADDING = 16;
const GAP = 16;
const COLUMN_COUNT = 2;
const RECIPE_ITEM_SIZE =
  (Dimensions.get("window").width -
    2 * SCREEN_PADDING -
    (COLUMN_COUNT - 1) * GAP) /
  COLUMN_COUNT;

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Recipes">,
  NativeStackScreenProps<MainStackParamList>
>;

const Container = styled.View`
  padding: 16px;
`;

const Section = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  border-radius: 16px;
`;

export const RecipesScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const recipes = useRecipeStore((s) => s.recipes);
  const fetchRecipes = useRecipeStore((s) => s.fetchRecipes);
  const fetching = useRecipeStore((s) => s.fetching);

  const viewRecipeDetails = (recipe) => {
    navigation.navigate("RecipeDetails", {
      recipe,
    });
  };
  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchRecipes} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          <Input placeholder="Search recipe by name" />
          <Space height={16} />
          <Section>
            {recipes.map((recipe, index) => (
              <TouchableOpacity onPress={() => viewRecipeDetails(recipe)}>
                <RecipeItem size={RECIPE_ITEM_SIZE} recipe={recipe} />
              </TouchableOpacity>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};
