import { View } from "react-native";
import styled from "styled-components/native";
import { Edit, Info, MoreHorizontal } from "lucide-react-native";
import { theme } from "@/theme";
import { Text } from "./Text";
import { Space } from "./Space";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "@/navigators";
import { FC } from "react";
import { Group } from "@/lib";
import { Image } from "expo-image";

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

const Avatar = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin: 12px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
`;

const EditButton = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
`;
export const GroupItem: FC<GroupItemProps> = (props) => {
  const { group, active, onSelect } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const manageGroup = () => {
    navigation.navigate("GroupDetails", {
      group,
    });
  };
  return (
    <Container active={active} onPress={() => onSelect(group.id)}>
      <Avatar source={{ uri: group?.image_url }} />
      <View>
        <Text preset="title">{group.name}</Text>
        {/* <Text preset="body" dim>
          {group.accounts[0].count} thành viên
        </Text> */}
      </View>
      <Space />
      <EditButton onPress={manageGroup}>
        <Info size={20} color={theme.colors.text} />
      </EditButton>
    </Container>
  );
};
