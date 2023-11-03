import { FC, useState } from "react";
import { BottomTabNavigatorProp } from "../../navigators";
import { DishItem } from "../../components";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

export const DishesScreen: FC<BottomTabNavigatorProp> = () => {
  const [selected, setSelected] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Bữa sáng</Text>
        <View style={styles.sectionContainer}>
          <DishItem />
          <DishItem />
          <DishItem />
        </View>

        <Text style={styles.sectionTitle}>Bữa trưa</Text>
        <View style={styles.sectionContainer}>
          <DishItem />
          <DishItem />
          <DishItem />
        </View>

        <Text style={styles.sectionTitle}>Bữa tối</Text>
        <View style={styles.sectionContainer}>
          <DishItem />
          <DishItem />
          <DishItem />
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
  sectionTitle: {
    marginHorizontal: 32,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  sectionContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 16,
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
