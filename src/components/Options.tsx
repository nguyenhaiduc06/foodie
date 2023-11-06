import styled from "styled-components/native";
import { theme } from "@/theme";
import { FC, useState } from "react";
import { Text } from "./Text";

type OptionsProps = {
  options: {
    value: string;
    label: string;
  }[];
  selectedValue: string;
  onChangeValue: (value: string) => void;
};

const Container = styled.View`
  height: 56px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
  padding: 0 8px;
  gap: 8px;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const ItemContainer = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(p) =>
    p.selected ? theme.palette.orange[100] : theme.palette.transparent};
  height: 40px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex: 1;
  border: 1px solid
    ${(p) =>
      p.selected ? theme.palette.orange[500] : theme.palette.transparent};
`;

const OptionItem = ({ value, label, selected, onSelect }) => {
  return (
    <ItemContainer selected={selected} onPress={() => onSelect(value)}>
      <Text>{label}</Text>
    </ItemContainer>
  );
};
export const Options: FC<OptionsProps> = (props) => {
  const { options, selectedValue, onChangeValue } = props;
  return (
    <Container>
      {options.map(({ value, label }) => (
        <OptionItem
          selected={value == selectedValue}
          onSelect={onChangeValue}
          key={value}
          value={value}
          label={label}
        />
      ))}
    </Container>
  );
};
