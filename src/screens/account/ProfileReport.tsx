import styled from "styled-components/native";
import { Space, Text } from "@/components";
import { Archive, BookOpenText, ShoppingCart } from "lucide-react-native";
import { theme } from "@/theme";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib";
import { useGroupStore } from "@/stores";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import dayjs from "dayjs";

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
  height: 264px;
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
  const [chartData, setChartData] = useState([]);
  const [recipeCount, setRecipeCount] = useState(0);
  const [storageCount, setStorageCount] = useState(0);
  const currentGroup = useGroupStore((s) => s.currentGroup);
  useEffect(() => {
    supabase
      .from("storages")
      .select("*")
      .eq("group_id", currentGroup?.id)
      .then(({ data, error }) => {
        setStorageCount(data.length);
      });
    supabase
      .from("recipes")
      .select("*")
      .eq("group_id", currentGroup?.id)
      .then(({ data, error }) => {
        setRecipeCount(data.length);
      });
    supabase
      .from("todos")
      .select("*")
      .eq("group_id", currentGroup?.id)
      .then(({ data, error }) => {
        // title = [sunday, monday]
        const chartData = [0, 0, 0, 0, 0, 0, 0];
        for (const todo of data) {
          const { date } = todo;
          const dayOfWeek = dayjs(date).day();
          chartData[dayOfWeek] = chartData[dayOfWeek] + 1;
        }
        setChartData(chartData);
      });
  }, []);
  return (
    <View>
      <BigSection>
        <Row gap={8}>
          <ShoppingCart size={18} color={theme.colors.text} />
          <Text preset="title">Thống kê mua sắm</Text>
        </Row>

        <View>
          <LineChart
            data={{
              labels: ["Chủ nhật", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
              datasets: [
                {
                  data: chartData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 64} // from react-native
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            // yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 8,
            }}
          />
        </View>
      </BigSection>
      <Space height={16} />
      <Row gap={16}>
        <SmallSection>
          <Row gap={8}>
            <BookOpenText size={18} color={theme.colors.text} />
            <Text preset="title">Công thức</Text>
          </Row>
          <Text size={32} weight={600} color={theme.colors.primary}>
            {recipeCount}
          </Text>
        </SmallSection>
        <SmallSection>
          <Row gap={8}>
            <Archive size={18} color={theme.colors.text} />
            <Text preset="title">Lưu trữ</Text>
          </Row>
          <Text size={32} weight={600} color={theme.colors.primary}>
            {storageCount}
          </Text>
        </SmallSection>
      </Row>
    </View>
  );
};
