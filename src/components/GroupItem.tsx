import { View } from "react-native";
import styled from "styled-components/native";
import { Edit } from "lucide-react-native";
import { theme } from "@/theme";
import { Text } from "./Text";
import { Space } from "./Space";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "@/navigators";
import { FC } from "react";
import { Group } from "@/lib";

type GroupItemProps = {
  group: Group;
  active?: boolean;
  onSelect: (group) => void;
};

const Container = styled.TouchableOpacity<{ active: boolean }>`
  height: 72px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  border: 1px solid
    ${(p) => (p.active ? theme.colors.primary : "rgba(0,0,0,0.05)")};
  background-color: ${(p) =>
    p.active ? theme.palette.orange[100] : theme.colors.foreground};
`;

const Icon = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
`;
export const GroupItem: FC<GroupItemProps> = (props) => {
  const { group, active, onSelect } = props;
  console.log(group);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const manageGroup = () => {
    navigation.navigate("ManageGroup", {
      groupId: group.id,
    });
  };
  return (
    <Container active={active} onPress={() => onSelect(group.id)}>
      <Icon>
        <Text size={30}>🍔</Text>
      </Icon>
      <View>
        <Text preset="title">{group.name}</Text>
        <Text preset="body" dim>
          {group.profiles[0].count} thành viên
        </Text>
      </View>
      <Space />
      <EditButton onPress={manageGroup}>
        <Edit size={20} color={theme.colors.text} />
      </EditButton>
    </Container>
  );
};
