import { FC, useEffect, useState } from "react";
import { Notification } from "@/lib";
import { Text } from "./Text";
type NotificationItemProps = {
  notification: Notification;
};

export const NotificationItem: FC<NotificationItemProps> = (props) => {
  return <Text>Notification</Text>;
};
