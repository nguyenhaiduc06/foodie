import React, { FC } from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { Text } from "./Text";
import { theme } from "@/theme";

type ActionButtonProps = TouchableOpacityProps & {
  left?: React.ReactNode;
  right?: React.ReactNode;
  label: string;
};

const Container = styled.TouchableOpacity`
  height: 48px;
  background-color: ${theme.colors.primary};
  border-radius: 100%;
  padding: 0 20px;
  gap: 4px;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 4px 4px rgba(249, 115, 22, 0.5);
`;
export const ActionButton: FC<ActionButtonProps> = (props) => {
  const { left, right, label, ...rest } = props;
  return (
    <Container {...rest}>
      {left}
      <Text weight={500} size={18} color={theme.colors.textInverted}>
        {label}
      </Text>
      {right}
    </Container>
  );
};
