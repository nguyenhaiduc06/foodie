import { FC } from "react";
import styled from "styled-components/native";
import { Text } from "./Text";

type EmptyStateProps = {
  label: string;
};

const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const EmptyState: FC<EmptyStateProps> = (props) => {
  const { label } = props;
  return (
    <Container>
      <Text dim>{label}</Text>
    </Container>
  );
};
