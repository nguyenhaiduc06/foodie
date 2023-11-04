import React, { FC } from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import { Screen, StorageItem, Input, Space } from "@/components";
import { theme } from "@/theme";
import { useStorageStore } from "@/stores";
import { Search } from "lucide-react-native";

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
  background-color: ${theme.colors.border};
  width: 100%;
`;

const Container = styled.View`
  padding: 16px;
`;

export const StoragesScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const storages = useStorageStore((s) => s.storages);
  const fetchStorages = useStorageStore((s) => s.fetchStorages);
  const fetching = useStorageStore((s) => s.fetching);

  const viewStorageDetails = (storage) => {
    navigation.navigate("StorageDetails", {
      storage,
    });
  };

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchStorages} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          <Input
            placeholder="Search storage by name"
            left={<Search color={theme.colors.textDim} />}
          />
          <Space height={16} />
          <Section>
            {storages.map((storage, index) => (
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
    </Screen>
  );
};
