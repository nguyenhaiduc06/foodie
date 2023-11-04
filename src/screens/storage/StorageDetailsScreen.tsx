import { FC, useEffect } from "react";
import styled from "styled-components/native";
import { MainStackScreenProps } from "@/navigators";
import { Screen, Text, Space } from "@/components";
import { theme } from "@/theme";

type ScreenProps = MainStackScreenProps<"StorageDetails">;

const CoverImage = styled.Image`
  height: 200px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
`;

const Container = styled.View`
  padding: 16px;
`;

export const StorageDetailsScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { storage } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>Edit</Text>,
    });
  }, [navigation]);

  return (
    <Screen>
      <Container>
        <CoverImage source={{ uri: storage.image_url }} />
        <Space height={8} />
        <Text preset="title">{storage.name}</Text>
        <Space height={16} />
        <Text>{storage.stored_in}</Text>
      </Container>
    </Screen>
  );
};
