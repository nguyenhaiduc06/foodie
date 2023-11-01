import { theme } from "@/theme";

import styled from "styled-components/native";
import { Text } from "./Text";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${theme.palette.yellow[300]};
  align-items: center;
  justify-content: center;
`;

export const GroupSelector = () => {
  const navigation = useNavigation();
  const openManageGroupScreen = () => {
    navigation.navigate("SelectGroup");
  };
  return (
    <Container onPress={openManageGroupScreen}>
      <Icon>
        <Text preset="heading">🍔</Text>
      </Icon>
      <View>
        <Text preset="title">Group</Text>
        <Text preset="body">5 members</Text>
      </View>
    </Container>
  );
};
