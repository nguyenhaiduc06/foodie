import { FC, useState } from "react";
import { BottomTabNavigatorProp } from "../navigators";
import { RecipeItem } from "../components";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

export const RecipesScreen: FC<BottomTabNavigatorProp> = () => {
  const [selected, setSelected] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.todosContainer}>
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text>New</Text>
      </TouchableOpacity>
    </View>
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
