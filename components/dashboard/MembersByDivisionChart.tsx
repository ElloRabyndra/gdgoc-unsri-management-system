import { useMemo } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DIVISIONS } from "@/types";

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

interface MembersByDivisionChartProps {
  members: Array<{ division: string }>;
}

export function MembersByDivisionChart({
  members,
}: MembersByDivisionChartProps) {
  const chartData = useMemo(() => {
    const divisionCounts = DIVISIONS.map((division) => ({
      name: division.length > 15 ? division.substring(0, 12) + "..." : division,
      fullName: division,
      count: members.filter((m) => m.division === division).length,
    })).filter((d) => d.count > 0);

    return divisionCounts;
  }, [members]);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Members by Division</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
            >
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GOOGLE_COLORS[index % GOOGLE_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium text-foreground">
          {payload[0].payload.fullName}
        </p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value} members
        </p>
      </div>
    );
  }
  return null;
}
