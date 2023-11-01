import { Image, StyleSheet, Text, View } from "react-native";

export const RecipeItem = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "" }} style={styles.icon} />
      <View>
        <Text style={styles.title}>Cơm rang thập cẩm</Text>
        <Text style={styles.subtitle}>12 quả</Text>
      </View>
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
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "black",
    opacity: 0.1,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 15,
  },
});
