import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnimal, getAllAnimals, animalTypes } from "@/lib/animal-data";
import { AnimalType } from "@/types";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

interface Props {
  params: { type: string };
}

export function generateStaticParams() {
  return animalTypes.map((type) => ({ type }));
}

export function generateMetadata({ params }: Props) {
  const animal = getAnimal(params.type as AnimalType);
  if (!animal) return {};

  return {
    title: `${animal.name} - ${animal.title} | Animal Selling`,
    description: animal.description,
  };
}

export default function AnimalTypePage({ params }: Props) {
  if (!animalTypes.includes(params.type as AnimalType)) {
    notFound();
  }

  const animal = getAnimal(params.type as AnimalType);
  const otherAnimals = getAllAnimals().filter((a) => a.id !== animal.id);

  return (
    <div className="py-12 relative overflow-hidden min-h-screen">
      <AnimatedBackground
        opacity={0.2}
        emojiOpacity={0.15}
        singleAnimal={{ emoji: animal.emoji, color: animal.color }}
      />
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="text-7xl mb-4">{animal.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: animal.color }}>
            {animal.name}
          </h1>
          <p className="text-2xl text-muted-foreground mb-4">{animal.title}</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {animal.description}
          </p>
          <Link href="/quiz">
            <Button size="lg" className="hover:scale-[1.02] hover:shadow-lg transition-all duration-300" style={{ backgroundColor: animal.color }}>
              Take the Quiz to Find Your Type
            </Button>
          </Link>
        </div>

        {/* Strengths & Blind Spots */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Sales Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {animal.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-muted-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-amber-500">!</span> Common Blind Spots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {animal.blindSpots.map((blindSpot, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span className="text-muted-foreground">{blindSpot}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Selling Style */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-2 transition-all duration-300 hover:shadow-lg" style={{ borderColor: animal.color }}>
            <CardHeader>
              <CardTitle>{animal.name}&apos;s Selling Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">{animal.sellingStyle}</p>
            </CardContent>
          </Card>
        </div>

        {/* Ideal Roles */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Ideal Sales Roles</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {animal.idealRoles.map((role, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 cursor-default"
                style={{ backgroundColor: `${animal.color}15`, color: animal.color }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Tips for Growth */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Tips for Growth</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {animal.tips.map((tip, i) => (
              <Card key={i} className="p-4 transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                <CardContent className="pt-0">
                  <div className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: animal.color }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selling to All Types */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-2">
            How to Sell to Each Type
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Adapt your approach based on your buyer's style
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {getAllAnimals().map((other) => (
              <Card
                key={other.id}
                className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                style={other.id === animal.id ? { borderLeft: `4px solid ${other.color}` } : {}}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span>{other.emoji}</span>
                    <span style={{ color: other.color }}>
                      Selling to {other.name}s
                    </span>
                    {other.id === animal.id && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-muted-foreground">You</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {animal.sellingToOthers[other.id]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Explore Other Types */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Explore Other Types</h2>
          <div className="grid grid-cols-3 gap-4">
            {otherAnimals.map((other) => (
              <Link key={other.id} href={`/animals/${other.id}`}>
                <Card className="text-center p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-3xl mb-2">{other.emoji}</div>
                  <p className="font-medium" style={{ color: other.color }}>
                    {other.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{other.title}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
