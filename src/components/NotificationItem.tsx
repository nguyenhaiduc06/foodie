import { FC, useEffect, useState } from "react";
import { Notification } from "@/lib";
import { Text } from "./Text";
import styled from "styled-components/native";
import { theme } from "@/theme";
import dayjs from "dayjs";
type NotificationItemProps = {
  notification: Notification;
};

const Container = styled.View`
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;

export const NotificationItem: FC<NotificationItemProps> = (props) => {
  const { notification } = props;
  return (
    <Container>
      <Text size={16} dim>
        {dayjs(notification.created_at).fromNow()}
      </Text>
      <Text preset="title">{notification.title}</Text>
      <Text preset="body">{notification.body}</Text>
    </Container>
  );
};
