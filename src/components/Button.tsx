import { TouchableOpacityProps } from "react-native";
import { theme } from "../theme";
import { FC } from "react";
import styled from "styled-components/native";
import { Text } from "./Text";

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
  const { preset = "secondary", label, ...rest } = props;
  const { disabled } = props;
  const backgroundColor = disabled
    ? theme.colors.foreground
    : PRESETS[preset].backgroundColor;
  const labelColor = disabled
    ? theme.palette.gray[400]
    : PRESETS[preset].labelColor;
  return (
    <Container backgroundColor={backgroundColor} {...rest}>
      <Text color={labelColor}>{label}</Text>
    </Container>
  );
};
