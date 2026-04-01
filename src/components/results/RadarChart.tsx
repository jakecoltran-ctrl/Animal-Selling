"use client";

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { animals } from "@/lib/animal-data";
import { AnimalType } from "@/types";

interface RadarChartProps {
  scores: {
    lion: number;
    penguin: number;
    retriever: number;
    beaver: number;
  };
  primaryType?: AnimalType;
  hideScores?: boolean;
}

// Custom label component that shows emoji and score
function CustomAxisLabel({ payload, x, y, cx, cy, scores, hideScores, primaryType }: {
  payload: { value: string };
  x: number;
  y: number;
  cx: number;
  cy: number;
  scores: Record<string, number>;
  hideScores?: boolean;
  primaryType?: AnimalType;
}) {
  const type = payload.value.toLowerCase() as AnimalType;
  const animal = animals[type];
  const score = scores[type];
  const isPrimary = type === primaryType;

  // Calculate position offset based on angle from center
  // Extra space on right (Retriever) and left (Penguin) for percentage text
  const offsetX = x > cx ? 25 : x < cx ? -25 : 0;
  const offsetY = y > cy ? 22 : y < cy ? -22 : 0;

  // Show score for primary, blur others when hideScores is true
  const shouldBlur = hideScores && !isPrimary;

  return (
    <g transform={`translate(${x + offsetX}, ${y + offsetY})`}>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: "20px" }}
      >
        {animal.emoji}
      </text>
      <text
        y={22}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: "13px",
          fontWeight: 700,
          fill: animal.color,
          filter: shouldBlur ? "blur(8px)" : "none",
        }}
      >
        {shouldBlur ? "??" : score}%
      </text>
    </g>
  );
}

export function RadarChart({ scores, primaryType, hideScores }: RadarChartProps) {
  // Find the primary type (highest score) if not provided
  const sortedTypes = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const actualPrimaryType = primaryType || sortedTypes[0][0] as AnimalType;
  const primaryColor = animals[actualPrimaryType].color;
  const secondaryType = sortedTypes[1][0] as AnimalType;
  const secondaryColor = animals[secondaryType].color;

  // Calculate dynamic minimum to emphasize differences
  const minScore = Math.min(scores.lion, scores.penguin, scores.retriever, scores.beaver);
  const domainMin = Math.max(0, minScore - 15);

  const data = [
    {
      type: "Lion",
      score: scores.lion,
      fullMark: 100,
      color: animals.lion.color,
    },
    {
      type: "Penguin",
      score: scores.penguin,
      fullMark: 100,
      color: animals.penguin.color,
    },
    {
      type: "Retriever",
      score: scores.retriever,
      fullMark: 100,
      color: animals.retriever.color,
    },
    {
      type: "Beaver",
      score: scores.beaver,
      fullMark: 100,
      color: animals.beaver.color,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="60%">
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={primaryColor} stopOpacity={0.6} />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <PolarGrid
          gridType="polygon"
          stroke="#e2e8f0"
          strokeWidth={1}
        />
        <PolarAngleAxis
          dataKey="type"
          tick={(props) => <CustomAxisLabel {...props} scores={scores} hideScores={hideScores} primaryType={actualPrimaryType} />}
        />
        <PolarRadiusAxis
          angle={45}
          domain={[domainMin, 70]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke={primaryColor}
          fill="url(#radarGradient)"
          fillOpacity={1}
          strokeWidth={3}
          dot={{
            r: 6,
            fill: primaryColor,
            stroke: "#fff",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 8,
            fill: primaryColor,
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload[0]) {
              const data = payload[0].payload;
              const type = data.type.toLowerCase() as AnimalType;
              const animal = animals[type];
              const isPrimary = type === actualPrimaryType;

              // If hideScores and not primary, show locked message
              if (hideScores && !isPrimary) {
                return (
                  <div className="bg-white px-3 py-2 rounded-lg shadow-lg border">
                    <div className="flex items-center gap-2">
                      <span>{animal.emoji}</span>
                      <span className="font-bold" style={{ color: animal.color }}>
                        {animal.name}
                      </span>
                      <span className="text-gray-400">🔒</span>
                    </div>
                  </div>
                );
              }

              return (
                <div className="bg-white px-3 py-2 rounded-lg shadow-lg border">
                  <div className="flex items-center gap-2">
                    <span>{animal.emoji}</span>
                    <span className="font-bold" style={{ color: animal.color }}>
                      {animal.name}
                    </span>
                    <span className="text-gray-600">{data.score}%</span>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}

interface ScoreBarProps {
  label: string;
  emoji: string;
  score: number;
  color: string;
  delay?: number;
  locked?: boolean;
}

function ScoreBar({ label, emoji, score, color, delay = 0, locked = false }: ScoreBarProps) {
  return (
    <div
      className="space-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          <span className="font-medium">{label}</span>
        </span>
        {locked ? (
          <span className="font-semibold text-gray-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="blur-sm select-none">??%</span>
          </span>
        ) : (
          <span className="font-semibold" style={{ color }}>{score}%</span>
        )}
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all ease-out"
          style={{
            width: locked ? '25%' : `${score}%`,
            backgroundColor: locked ? '#9ca3af' : color,
            animation: locked ? undefined : `progressFill 1s ease-out ${delay + 200}ms forwards`,
          }}
        />
      </div>
    </div>
  );
}

interface ScoreBarsProps extends RadarChartProps {
  locked?: boolean;
}

export function ScoreBars({ scores, locked = false }: ScoreBarsProps) {
  // Sort by score to show highest first
  const sortedScores = [
    { key: 'lion', score: scores.lion, animal: animals.lion },
    { key: 'penguin', score: scores.penguin, animal: animals.penguin },
    { key: 'retriever', score: scores.retriever, animal: animals.retriever },
    { key: 'beaver', score: scores.beaver, animal: animals.beaver },
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-4">
      {sortedScores.map((item, index) => (
        <ScoreBar
          key={item.key}
          label={item.animal.name}
          emoji={item.animal.emoji}
          score={item.score}
          color={item.animal.color}
          delay={index * 150}
          locked={locked}
        />
      ))}
    </div>
  );
}
