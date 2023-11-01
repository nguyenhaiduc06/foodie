import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { theme } from "../theme";
import { FC } from "react";

type InputProps = TextInputProps & {};

export const Input: FC<InputProps> = (props) => {
  const { ...rest } = props;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={theme.palette.gray[400]}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.foreground,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 16,
    height: 56,
    fontFamily: "Inter_500Medium",
    color: theme.colors.text,
    flex: 1,
  },
});
