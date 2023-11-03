import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "./Text";
import { Space } from "./Space";

type DishItemProps = {};

export const DishItem: FC<DishItemProps> = (props) => {
  return (
    <View style={[styles.container]}>
      <Image source={{ uri: "" }} style={styles.icon} />
      <Text preset="title">Món ăn</Text>
      <Space />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "black",
    opacity: 0.05,
  },
});
