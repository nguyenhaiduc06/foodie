import { TextInputProps, ViewStyle } from "react-native";
import { theme } from "../theme";
import React, { FC } from "react";
import styled from "styled-components/native";

type InputProps = TextInputProps & {
  left?: React.ReactNode;
  right?: React.ReactNode;
  containerStyle?: ViewStyle;
};

const Container = styled.View<{ height: number }>`
  height: ${(p) => p.height}px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
  padding: 0 16px;
  gap: 8px;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const TextInput = styled.TextInput<{ height: number }>`
  font-size: 16px;
  height: ${(p) => p.height}px;
  font-family: "Inter_500Medium";
  color: ${theme.colors.text};
  flex: 1;
`;

export const Input: FC<InputProps> = (props) => {
  const { left, right, children, containerStyle, multiline, ...rest } = props;
  const containerHeight = multiline ? 232 : 56;
  const textInputHeight = multiline ? 200 : 56;
  return (
    <Container style={containerStyle} height={containerHeight}>
      {left}
      <TextInput
        height={textInputHeight}
        placeholderTextColor={theme.palette.gray[400]}
        clearButtonMode="while-editing"
        multiline={multiline}
        {...rest}
      />
      {right}
    </Container>
  );
};
