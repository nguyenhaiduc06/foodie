import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Text } from "./Text";
import React, { FC } from "react";
import { Space } from "./Space";
import { theme } from "@/theme";
import { ChevronDown } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "@/navigators";

type HeaderProps = {
  title: string;
};

const Container = styled.View`
  background-color: ${theme.colors.foreground};
  /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2); */
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-bottom-width: 1px;
`;

const HeaderContainer = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

const GroupSelector = styled.TouchableOpacity`
  /* flex-direction: row;
  align-items: center; */
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: black;
`;
export const Header: FC<HeaderProps> = (props) => {
  const { title } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainStackParamList>();
  const selectGroup = () => {
    navigation.navigate("SelectGroup");
  };
  return (
    <Container>
      <Space height={insets.top} />
      <HeaderContainer>
        <Text size={18} weight={600}>
          {title}
        </Text>
        <Space />
        <GroupSelector onPress={selectGroup}>
          {/* <Text size={18} weight={600}>
            Nhóm gia đình
          </Text>
          <ChevronDown color={theme.colors.text} /> */}
        </GroupSelector>
      </HeaderContainer>
    </Container>
  );
};
