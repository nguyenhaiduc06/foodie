import styled from "styled-components/native";
import { Text } from "./Text";
import { FC } from "react";
import { Storage } from "@/lib";
import { Space } from "./Space";
import dayjs from "dayjs";

type StorageItemProps = {
  storage: Storage;
};

const Container = styled.View`
  padding: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StorageItem: FC<StorageItemProps> = (props) => {
  const { storage } = props;
  return (
    <Container>
      <Row>
        <Text preset="title">{storage.name}</Text>
        <Space />
        <Text preset="title">{dayjs(storage.expire_date).fromNow()}</Text>
      </Row>
      <Space height={4} />
      <Row>
        <Text dim>{storage.amount}</Text>
        <Space />
        <Text dim>{storage.stored_in}</Text>
      </Row>
    </Container>
  );
};
