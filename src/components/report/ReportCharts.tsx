"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { AnimalType } from "@/types";
import { animals } from "@/lib/animal-data";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

// Color map for animals
const COLORS: Record<AnimalType, string> = {
  lion: "#dc2626",
  penguin: "#0891b2",
  retriever: "#d97706",
  beaver: "#059669",
};

// ============================================
// BLEND PIE CHART (Page 2)
// ============================================

interface BlendPieChartProps {
  percentages: Record<AnimalType, number>;
  primaryType: AnimalType;
}

export function BlendPieChart({ percentages, primaryType }: BlendPieChartProps) {
  const data = [
    { name: "Lion", value: percentages.lion, color: COLORS.lion, type: "lion" as AnimalType },
    { name: "Penguin", value: percentages.penguin, color: COLORS.penguin, type: "penguin" as AnimalType },
    { name: "Retriever", value: percentages.retriever, color: COLORS.retriever, type: "retriever" as AnimalType },
    { name: "Beaver", value: percentages.beaver, color: COLORS.beaver, type: "beaver" as AnimalType },
  ].sort((a, b) => b.value - a.value);

  // Custom label renderer that positions labels outside the pie
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    name,
    value,
    color,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    name: string;
    value: number;
    color: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${name} ${value}%`}
      </text>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={2}
            dataKey="value"
            label={renderCustomLabel}
            labelLine={{
              stroke: "#9ca3af",
              strokeWidth: 1,
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.name.toLowerCase() === primaryType ? "#000" : "transparent"}
                strokeWidth={entry.name.toLowerCase() === primaryType ? 3 : 0}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-1">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1 text-sm">
            <AnimalIcon type={item.type} size="sm" variant="head" />
            <span style={{ color: item.color }} className="font-medium">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// STRENGTHS VS BLIND SPOTS RADAR (Page 3)
// ============================================

interface StrengthsRadarProps {
  primaryType: AnimalType;
}

export function StrengthsRadar({ primaryType }: StrengthsRadarProps) {
  const animal = animals[primaryType];

  // Create dimensions based on key selling attributes
  const data = [
    { dimension: "Closing", strength: primaryType === "lion" ? 95 : primaryType === "penguin" ? 70 : primaryType === "retriever" ? 50 : 75 },
    { dimension: "Relationship", strength: primaryType === "lion" ? 55 : primaryType === "penguin" ? 90 : primaryType === "retriever" ? 95 : 60 },
    { dimension: "Preparation", strength: primaryType === "lion" ? 60 : primaryType === "penguin" ? 50 : primaryType === "retriever" ? 70 : 95 },
    { dimension: "Adaptability", strength: primaryType === "lion" ? 70 : primaryType === "penguin" ? 85 : primaryType === "retriever" ? 80 : 55 },
    { dimension: "Persistence", strength: primaryType === "lion" ? 90 : primaryType === "penguin" ? 65 : primaryType === "retriever" ? 85 : 80 },
    { dimension: "Listening", strength: primaryType === "lion" ? 50 : primaryType === "penguin" ? 75 : primaryType === "retriever" ? 95 : 70 },
  ];

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={380}>
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: "#64748b", fontSize: 13 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Your Strengths"
            dataKey="strength"
            stroke={animal.color}
            fill={animal.color}
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Tooltip formatter={(value: number) => [`${value}/100`, "Score"]} />
        </RechartsRadarChart>
      </ResponsiveContainer>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        Your natural selling strengths as a {animal.name}
      </p>
    </div>
  );
}

// ============================================
// COMPARISON BAR CHART (Page 5)
// ============================================

interface ComparisonBarChartProps {
  primaryType: AnimalType;
}

export function ComparisonBarChart({ primaryType }: ComparisonBarChartProps) {
  // Data showing how each type scores on key dimensions
  const dimensions = [
    {
      name: "Decision Speed",
      lion: 95,
      penguin: 75,
      retriever: 45,
      beaver: 35,
    },
    {
      name: "People Focus",
      lion: 40,
      penguin: 90,
      retriever: 95,
      beaver: 50,
    },
    {
      name: "Risk Taking",
      lion: 90,
      penguin: 75,
      retriever: 35,
      beaver: 30,
    },
    {
      name: "Detail Focus",
      lion: 35,
      penguin: 40,
      retriever: 65,
      beaver: 95,
    },
  ];

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={dimensions}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11 }}
            width={75}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, ""]}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#f9fafb",
            }}
            labelStyle={{ color: "#f9fafb" }}
            itemStyle={{ color: "#f9fafb" }}
          />
          <Bar
            dataKey="lion"
            fill={COLORS.lion}
            opacity={primaryType === "lion" ? 1 : 0.3}
            name="Lion"
          />
          <Bar
            dataKey="penguin"
            fill={COLORS.penguin}
            opacity={primaryType === "penguin" ? 1 : 0.3}
            name="Penguin"
          />
          <Bar
            dataKey="retriever"
            fill={COLORS.retriever}
            opacity={primaryType === "retriever" ? 1 : 0.3}
            name="Retriever"
          />
          <Bar
            dataKey="beaver"
            fill={COLORS.beaver}
            opacity={primaryType === "beaver" ? 1 : 0.3}
            name="Beaver"
          />
        </BarChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2">
        {(["lion", "penguin", "retriever", "beaver"] as AnimalType[]).map((type) => (
          <div
            key={type}
            className={`flex items-center gap-1 text-xs ${
              type === primaryType ? "font-bold" : "opacity-50"
            }`}
          >
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: COLORS[type] }}
            />
            <span>{animals[type].name}</span>
            {type === primaryType && <span>(You)</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// GROWTH GAP CHART (Page 7)
// ============================================

interface GrowthGapChartProps {
  scores: Record<AnimalType, number>;
  primaryType: AnimalType;
}

export function GrowthGapChart({ scores, primaryType }: GrowthGapChartProps) {
  // Sort all animals by score (lowest first = needs most work, displayed on left)
  const data = (["lion", "penguin", "retriever", "beaver"] as AnimalType[])
    .map((type) => ({
      name: animals[type].name,
      score: scores[type],
      color: COLORS[type],
      type: type,
    }))
    .sort((a, b) => a.score - b.score);

  // Mark lowest two as needing development
  const lowestTwo = [data[0].type, data[1].type];

  return (
    <div className="w-full">
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
        Your animal blend totals 100% — focus on developing the left side
      </p>

      {/* Stacked Horizontal Bar */}
      <div className="relative h-16 rounded-xl overflow-hidden flex shadow-inner">
        {data.map((item, index) => (
          <div
            key={item.type}
            className="h-full flex items-center justify-center relative transition-all"
            style={{
              width: `${item.score}%`,
              backgroundColor: item.color,
              opacity: lowestTwo.includes(item.type) ? 1 : 0.65,
            }}
          >
            {/* Only show label if segment is wide enough */}
            {item.score >= 15 && (
              <div className="flex flex-col items-center text-white">
                <AnimalIcon type={item.type} size="sm" variant="head" className="brightness-0 invert" />
                <span className="text-xs font-bold">{item.score}%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Labels for small segments (shown below bar) */}
      <div className="flex mt-2 gap-1">
        {data.map((item) => (
          item.score < 15 && (
            <div
              key={item.type}
              className="flex items-center gap-1 text-xs"
              style={{ width: `${item.score}%` }}
            >
              <AnimalIcon type={item.type} size={12} variant="head" />
              <span style={{ color: item.color }} className="font-bold">{item.score}%</span>
            </div>
          )
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-4 px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <AnimalIcon type={data[0].type} size="md" variant="head" />
            <AnimalIcon type={data[1].type} size="md" variant="head" />
          </div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            ← Focus Areas (develop these)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">
            Strengths (leverage these) →
          </span>
          <div className="flex items-center gap-1">
            <AnimalIcon type={data[2].type} size="md" variant="head" />
            <AnimalIcon type={data[3].type} size="md" variant="head" />
          </div>
        </div>
      </div>

      {/* Animal Names Legend */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {data.map((item, index) => (
          <div
            key={item.type}
            className={`flex items-center gap-1 text-xs ${
              lowestTwo.includes(item.type) ? "font-bold" : "opacity-70"
            }`}
          >
            <div
              className="w-3 h-3 rounded"
              style={{
                backgroundColor: item.color,
                opacity: lowestTwo.includes(item.type) ? 1 : 0.65,
              }}
            />
            <AnimalIcon type={item.type} size={12} variant="head" />
            <span>{item.name}</span>
            <span style={{ color: item.color }} className="font-semibold">{item.score}%</span>
            {index < 2 && (
              <span className="text-amber-600 dark:text-amber-400 text-xs ml-1">
                #{index + 1}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SCORE DISTRIBUTION CHART (Bonus)
// ============================================

interface ScoreDistributionProps {
  percentages: Record<AnimalType, number>;
}

export function ScoreDistribution({ percentages }: ScoreDistributionProps) {
  const data = (["lion", "penguin", "retriever", "beaver"] as AnimalType[]).map(
    (type) => ({
      name: animals[type].name,
      type: type,
      score: percentages[type],
      color: COLORS[type],
    })
  );

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="emoji"
            tick={{ fontSize: 20 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis domain={[0, 50]} tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Score"]}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
