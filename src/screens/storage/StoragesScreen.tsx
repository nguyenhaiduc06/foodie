import React, { FC, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import {
  Screen,
  StorageItem,
  Input,
  Space,
  ActionButton,
  EmptyState,
} from "@/components";
import { theme } from "@/theme";
import { useStorageStore } from "@/stores";
import { Plus, Search } from "lucide-react-native";

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Storages">,
  NativeStackScreenProps<MainStackParamList>
>;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
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

export const StoragesScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const initStorageStore = useStorageStore((s) => s.initStorageStore);
  const storages = useStorageStore((s) => s.storages);
  const fetchStorages = useStorageStore((s) => s.fetchStorages);
  const fetching = useStorageStore((s) => s.fetching);

  useEffect(() => {
    initStorageStore();
  }, []);

  const viewStorageDetails = (storage) => {
    navigation.navigate("StorageDetails", {
      storage,
    });
  };

  const addStorage = () => {
    navigation.navigate("AddStorage");
  };

  const filteredStorages = storages.filter(
    (s) => s.name.toLowerCase().indexOf(search.trim().toLowerCase()) >= 0
  );

  return (
    <Screen>
      <Container>
        <Space height={16} />
        <Input
          placeholder="Tìm kiếm theo tên, nơi cất"
          left={<Search color={theme.colors.textDim} />}
          onChangeText={setSearch}
        />
        <Space height={16} />
      </Container>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchStorages} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          {filteredStorages.length == 0 && (
            <EmptyState label="Chưa có thực phẩm nào đang lưu trữ" />
          )}
          <Section>
            {filteredStorages.map((storage, index) => (
              <React.Fragment key={storage.id}>
                {index != 0 && <Divider />}
                <TouchableOpacity onPress={() => viewStorageDetails(storage)}>
                  <StorageItem storage={storage} />
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </Section>
        </Container>
      </ScrollView>

      <ActionButtonContainer>
        <ActionButton
          label="Thêm"
          left={<Plus color={theme.colors.textInverted} size={22} />}
          onPress={addStorage}
        />
      </ActionButtonContainer>
    </Screen>
  );
};
