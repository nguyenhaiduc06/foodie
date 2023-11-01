import { FC } from "react";
import { ViewProps } from "react-native";
import { styled } from "styled-components/native";
import { theme } from "../theme";
import { Text } from "./Text";
type ChipProps = ViewProps & {
  backgroundColor?: string;
  label: string;
  labelColor?: string;
  borderColor?: string;
};

const Container = styled.View<{ backgroundColor: string; borderColor: string }>`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ?? theme.colors.foreground};
  border-radius: 50%;
  height: 40px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(p) => p.borderColor};
`;

export const Chip: FC<ChipProps> = (props) => {
  const {
    label,
    labelColor = theme.colors.text,
    backgroundColor = theme.colors.foreground,
    borderColor = theme.colors.foreground,
    ...rest
  } = props;
  return (
    <Container
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      {...rest}
    >
      <Text>{label}</Text>
    </Container>
  );
};
