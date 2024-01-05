import styled from "styled-components/native";
import { Space, Text } from "@/components";
import { BookOpenText, ShoppingCart } from "lucide-react-native";
import { theme } from "@/theme";
import { View } from "react-native";

const Row = styled.View<{ gap: number }>`
  flex-direction: row;
  align-items: center;
  gap: ${(p) => p.gap}px;
`;

const BigSection = styled.View`
  background-color: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
  height: 200px;
  padding: 16px;
`;

const SmallSection = styled.View`
  background-color: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  gap: 8px;
  flex: 1;
`;

export const ProfileReport = () => {
  return (
    <View>
      <BigSection>
        <Row gap={8}>
          <ShoppingCart size={18} color={theme.colors.text} />
          <Text preset="title">Thống kê mua sắm</Text>
        </Row>
      </BigSection>
      <Space height={16} />
      <Row gap={16}>
        <SmallSection>
          <Row gap={8}>
            <BookOpenText size={18} color={theme.colors.text} />
            <Text preset="title">Công thức</Text>
          </Row>
          <Text size={32} weight={600}>
            15
          </Text>
        </SmallSection>
        <SmallSection>
          <Row gap={8}>
            <BookOpenText size={18} color={theme.colors.text} />
            <Text preset="title">Lưu trữ</Text>
          </Row>
          <Text size={32} weight={600}>
            15
          </Text>
        </SmallSection>
      </Row>
    </View>
  );
};
