import React, { FC, useEffect } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  HomeTabScreenProps,
  MainStackParamList,
  MainStackScreenProps,
} from "@/navigators";
import {
  ActionButton,
  Button,
  DateSelector,
  EmptyState,
  Header,
  NotificationItem,
  Screen,
  Space,
  TodoItem,
} from "@/components";
import { theme } from "@/theme";
import { useNotificationStore, useTodoStore } from "@/stores";
import axios from "axios";
import dayjs from "dayjs";

type ScreenProps = MainStackScreenProps<"ListNotifications">;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.palette.black[10]};
  width: 100%;
`;

const Container = styled.View`
  padding: 0 16px;
`;

const ActionButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px;
  align-items: flex-end;
`;

export const ListNotificationsScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const notifications = useNotificationStore((s) => s.notifications);
  const initNotificationStore = useNotificationStore(
    (s) => s.initNotificationStore
  );

  useEffect(() => {
    initNotificationStore();
  }, []);

  const createNoti = () => {
    const dateToSendNotification = dayjs().add(10, "seconds").toDate();
    const push_token = useNotificationStore.getState().pushToken;
    axios
      .post("http://192.168.31.60:3000/notifications", {
        id: "id",
        push_token,
        title: "Thực phẩm sắp hết hạn",
        body: "Còn 3 ngày nữa là món gà trong tủ lạnh sẽ hết hạn",
        date: dateToSendNotification,
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e.message));
  };

  const updateNoti = () => {
    const dateToSendNotification = dayjs().add(5, "seconds");
    axios
      .put("http://192.168.31.60:3000/notifications", {
        id: "id",
        date: dateToSendNotification.toDate(),
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e.message));
  };

  return (
    <Screen>
      <ScrollView>
        <Button onPress={createNoti} label="Create" />
        <Button onPress={updateNoti} label="Update" />
        <Container onStartShouldSetResponder={() => true}>
          {notifications.length == 0 ? (
            <EmptyState label="Bạn không có thông báo nào" />
          ) : (
            <Section>
              {notifications.map((notification, index) => (
                <NotificationItem />
              ))}
            </Section>
          )}

          {/* Add a space with a height of 72px to avoid being covered by the floating action button */}
          <Space height={72} />
        </Container>
      </ScrollView>
    </Screen>
  );
};
