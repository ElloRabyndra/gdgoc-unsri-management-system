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
    // Filter out "No Division" from DIVISIONS
    const validDivisions = DIVISIONS.filter((d) => d !== "No Division");

    const divisionCounts = validDivisions
      .map((division) => ({
        name:
          division.length > 15 ? division.substring(0, 12) + "..." : division,
        fullName: division,
        count: members.filter((m) => m.division === division).length,
      }))
      .filter((d) => d.count > 0) // Only show divisions with members
      .sort((a, b) => b.count - a.count); // Sort by count descending

    return divisionCounts;
  }, [members]);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Members by Division</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-[350px] items-center justify-center text-muted-foreground">
            <p>No members with divisions yet</p>
          </div>
        ) : (
          <div className="h-[350px] w-full -ml-5 md:ml-0">
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
        )}
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
          {payload[0].value} {payload[0].value === 1 ? "member" : "members"}
        </p>
      </div>
    );
  }
  return null;
}
