import React, { FC } from "react";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import { RecipeItem, Screen } from "@/components";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRecipeStore } from "@/stores/recipeStore";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Recipes">,
  NativeStackScreenProps<MainStackParamList>
>;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  width: 100%;
`;

const Container = styled.View`
  padding: 16px;
`;

export const RecipesScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const recipes = useRecipeStore((s) => s.recipes);
  const fetchRecipes = useRecipeStore((s) => s.fetchRecipes);
  const fetching = useRecipeStore((s) => s.fetching);

  const viewRecipeDetails = (recipe) => {
    navigation.navigate("RecipeDetails");
  };
  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchRecipes} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          <Section>
            {recipes.map((recipe, index) => (
              <React.Fragment key={recipe.id}>
                {index != 0 && <Divider />}
                <TouchableOpacity onPress={() => viewRecipeDetails(recipe)}>
                  <RecipeItem recipe={recipe} />
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};
