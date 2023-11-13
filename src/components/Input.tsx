import { TextInputProps, ViewStyle } from "react-native";
import { theme } from "../theme";
import React, { FC } from "react";
import styled from "styled-components/native";

type InputProps = TextInputProps & {
  left?: React.ReactNode;
  right?: React.ReactNode;
  containerStyle?: ViewStyle;
};

const Container = styled.View`
  height: 56px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
  padding: 0 16px;
  gap: 8px;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const TextInput = styled.TextInput`
  font-size: 16px;
  height: 56px;
  font-family: "Inter_500Medium";
  color: ${theme.colors.text};
  flex: 1;
`;

export const Input: FC<InputProps> = (props) => {
  const { left, right, children, containerStyle, ...rest } = props;
  return (
    <Container style={containerStyle}>
      {left}
      <TextInput
        placeholderTextColor={theme.palette.gray[400]}
        clearButtonMode="while-editing"
        {...rest}
      />
      {right}
    </Container>
  );
};
