import { Input, Text } from "@/components";
import { Account } from "@/lib";
import { api } from "@/lib/api";
import { theme } from "@/theme";
import { FC, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";

type AccountSearchProps = {
  onAccountFound: (account: Account) => void;
  searchButtonTitle?: string;
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SearchButton = styled.TouchableOpacity`
  height: 56px;
  border-radius: 16px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

export const AccountSearch: FC<AccountSearchProps> = (props) => {
  const { onAccountFound, searchButtonTitle = "Tìm" } = props;
  const [email, setEmail] = useState("");

  const handleSearchPress = async () => {
    const { data: account, error } = await api.getAccount({ email });
    if (!account) {
      Alert.alert(`Không tìm thấy người dùng có email ${email}`);
      return;
    }
    onAccountFound(account);
  };
  return (
    <Row>
      <Input
        placeholder="Email"
        onChangeText={setEmail}
        containerStyle={{ flex: 1 }}
        autoCapitalize="none"
      />
      <SearchButton onPress={handleSearchPress}>
        <Text color={theme.colors.textInverted}>{searchButtonTitle}</Text>
      </SearchButton>
    </Row>
  );
};
