import styled from "styled-components/native";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "@/navigators";
import { theme } from "@/theme";
import { useGroupStore } from "@/stores";
import { Text } from "./Text";
import { Space } from "./Space";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
`;

export const GroupSelector = () => {
  const currentGroup = useGroupStore((s) => s.currentGroup);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const openManageGroupScreen = () => {
    navigation.navigate("ListGroups");
  };
  return (
    <Container onPress={openManageGroupScreen}>
      <Icon source={{ uri: currentGroup?.image_url ?? "" }} />
      <Space width={8} />
      <Text preset="title">{currentGroup?.name}</Text>
      <ChevronRight size={20} color={theme.colors.text} />
    </Container>
  );
};
