import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from "react-native";
import { theme } from "../theme";
import { FC } from "react";

type ButtonProps = TouchableOpacityProps & {
  label: string;
};

export const Button: FC<ButtonProps> = (props) => {
  const { label, ...rest } = props;
  const { disabled } = props;
  const backgroundColor = disabled
    ? theme.colors.foreground
    : theme.colors.primary;
  const labelColor = disabled
    ? theme.palette.gray[400]
    : theme.colors.textInverted;
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} {...rest}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
  },
});
