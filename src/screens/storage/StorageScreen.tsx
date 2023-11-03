import React, { FC } from "react";
import { BottomTabScreenProps, MainStackParamList } from "@/navigators";
import { RecipeItem, Screen } from "@/components";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useStorageStore } from "@/stores";

type ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<"Storage">,
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

export const StorageScreen: FC<ScreenProps> = (props) => {
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
            {storages.map((recipe, index) => (
              <React.Fragment key={recipe.id}>
                {index != 0 && <Divider />}
                <TouchableOpacity onPress={() => viewStorageDetails(recipe)}>
                  <RecipeItem recipe={recipe} />
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};
