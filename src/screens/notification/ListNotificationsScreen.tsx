import React, { FC, useEffect } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
} from "react-native";
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
import { supabase } from "@/lib";

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
  const fetchNotifications = useNotificationStore((s) => s.fetchNotifications);
  const fetching = useNotificationStore((s) => s.fetching);

  useEffect(() => {
    initNotificationStore();
  }, []);

  const openStorageDetails = async (storage_id) => {
    const { data, error } = await supabase
      .from("storages")
      .select("*")
      .eq("id", storage_id)
      .single();
    navigation.navigate("UpdateStorage", { storage: data });
  };

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={fetchNotifications}
            refreshing={fetching}
          />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          {notifications.length == 0 ? (
            <EmptyState label="Bạn không có thông báo nào" />
          ) : (
            notifications.map((notification, index) => (
              <TouchableOpacity
                onPress={() => openStorageDetails(notification.storage_id)}
              >
                <NotificationItem notification={notification} />
              </TouchableOpacity>
            ))
          )}

          {/* Add a space with a height of 72px to avoid being covered by the floating action button */}
          <Space height={72} />
        </Container>
      </ScrollView>
    </Screen>
  );
};
