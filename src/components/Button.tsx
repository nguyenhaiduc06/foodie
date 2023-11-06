import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { theme } from "../theme";
import { FC } from "react";
import styled from "styled-components/native";
import { Text } from "./Text";
import { Loader } from "lucide-react-native";

const PRESETS = {
  primary: {
    backgroundColor: theme.colors.primary,
    labelColor: theme.colors.textInverted,
    shadowColor: "rgba(0,0,0,0.05)",
  },
  secondary: {
    backgroundColor: theme.colors.foreground,
    labelColor: theme.colors.text,
    shadowColor: "rgba(0,0,0,0.05)",
  },
};

type ButtonProps = TouchableOpacityProps & {
  preset: keyof typeof PRESETS;
  label: string;
  loading?: boolean;
};

const Container = styled.TouchableOpacity<{
  backgroundColor: string;
}>`
  background-color: ${(p) => p.backgroundColor};
  height: 56px;
  border-radius: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const Button: FC<ButtonProps> = (props) => {
  const {
    preset = "secondary",
    label,
    loading = false,
    disabled = false,
    ...rest
  } = props;
  const backgroundColor =
    disabled || loading
      ? theme.colors.foreground
      : PRESETS[preset].backgroundColor;
  const labelColor =
    disabled || loading ? theme.palette.gray[400] : PRESETS[preset].labelColor;
  return (
    <Container
      backgroundColor={backgroundColor}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text size={17} weight={500} color={labelColor}>
          {label}
        </Text>
      )}
    </Container>
  );
};
