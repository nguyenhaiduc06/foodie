import { FC, useState } from "react";
import { BottomTabNavigatorProp, BottomTabScreenProps } from "@/navigators";
import { RecipeItem, Screen } from "@/components";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { useRecipeStore } from "@/stores/recipeStore";
import styled from "styled-components/native";
import { theme } from "@/theme";

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

export const RecipesScreen: FC<BottomTabScreenProps<"Recipes">> = (props) => {
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
              <>
                {index != 0 && <Divider />}
                <TouchableOpacity onPress={() => viewRecipeDetails(recipe)}>
                  <RecipeItem key={recipe.id} recipe={recipe} />
                </TouchableOpacity>
              </>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  todosContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    margin: 16,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
    backgroundColor: "blue",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
});
