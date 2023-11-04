import React, { FC } from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import { Screen, RecipeItem } from "@/components";
import { theme } from "@/theme";
import { useStorageStore } from "@/stores";

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Storage">,
  NativeStackScreenProps<MainStackParamList>
>;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
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
    navigation.navigate("StorageDetails");
  };

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchStorages} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          <Section>
            {storages.map((storage, index) => (
              <React.Fragment key={storage.id}>
                {index != 0 && <Divider />}
                <TouchableOpacity onPress={() => viewStorageDetails(storage)}>
                  <RecipeItem recipe={storage} />
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};
