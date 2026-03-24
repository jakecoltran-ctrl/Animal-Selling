import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAnimals } from "@/lib/animal-data";
import { TeamSafariBubble } from "@/components/ui/TeamSafariLogo";

export default function Home() {
  const animals = getAllAnimals();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Sell Smarter by Understanding{" "}
              <span className="bg-gradient-to-r from-lion-600 via-penguin-600 to-beaver-600 bg-clip-text text-transparent">
                Your Sales Animal
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover your natural selling strengths with Animal Selling — a framework
              that helps salespeople understand themselves and connect better with every customer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button size="xl" className="w-full sm:w-auto press-effect">
                  Take the Sales Animal Quiz
                </Button>
              </Link>
              <Link href="#animals">
                <Button size="xl" variant="outline" className="w-full sm:w-auto press-effect">
                  Explore the Framework
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="py-16 bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Animal Selling Works</h2>
            <p className="text-muted-foreground">
              Great salespeople adapt their approach to match each customer. Animal Selling
              gives you the language and framework to do exactly that.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { emoji: "🎯", title: "Know Your Strengths", desc: "Understand your natural selling style so you can leverage what makes you effective." },
              { emoji: "🤝", title: "Read Your Buyers", desc: "Quickly identify your customer's style and adapt your approach for better connections." },
              { emoji: "📈", title: "Close More Deals", desc: "When you match your style to your buyer, deals move faster and stick longer." },
            ].map((item, index) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-lg hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 200}ms` }}>{item.emoji}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animal Types Section */}
      <section id="animals" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Four Sales Archetypes</h2>
            <p className="text-muted-foreground">
              Each archetype brings unique strengths to the sales process. Most people are
              a blend of two or more types.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {animals.map((animal, index) => (
              <Link key={animal.id} href={`/animals/${animal.id}`}>
                <Card
                  className="h-full hover:shadow-lg transition-all cursor-pointer group hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center pb-2">
                    <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {animal.emoji}
                    </div>
                    <CardTitle
                      className="text-xl"
                      style={{ color: animal.color }}
                    >
                      {animal.name}
                    </CardTitle>
                    <CardDescription className="font-medium">
                      {animal.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {animal.tagline}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team Safari Teaser */}
      <section className="py-20 bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <TeamSafariBubble className="mb-6" />
            <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              See your entire sales team's style distribution at a glance. Identify gaps,
              optimize pairings, and build a more balanced team.
            </p>

            {/* How It Works */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { step: "1", title: "Create Your Team", desc: "Set up your team in seconds with a unique invite link" },
                { step: "2", title: "Invite Your Team", desc: "Share the link — teammates take the quiz and join automatically" },
                { step: "3", title: "See Team Insights", desc: "View your team's animal distribution and get pairing recommendations" },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="bg-white dark:bg-white/10 rounded-xl p-6 animate-fade-in shadow-sm dark:shadow-none border-2 border-gray-200 dark:border-white/20"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Use Cases */}
            <div className="grid md:grid-cols-3 gap-4 mb-10 text-left">
              {[
                { emoji: "👔", title: "Sales Managers", desc: "Understand your team's collective strengths and gaps" },
                { emoji: "🎓", title: "Onboarding", desc: "Help new reps understand their teammates' styles" },
                { emoji: "🤝", title: "Deal Teams", desc: "Pair complementary styles for complex opportunities" },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 bg-white dark:bg-white/5 rounded-lg p-4 animate-fade-in shadow-sm dark:shadow-none border border-gray-200 dark:border-white/20"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/dashboard/team">
              <Button
                size="xl"
                className="text-white border-0 shadow-lg shadow-retriever-500/30 hover:shadow-xl hover:shadow-retriever-500/40 hover:scale-105 transition-all duration-300 press-effect text-lg px-8"
                style={{
                  background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)"
                }}
              >
                <span className="mr-2">🚀</span>
                Start Your Team Safari
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="text-5xl mb-6">🦁🐧🐕🦫</div>
            <h2 className="text-3xl font-bold mb-4">Create Your Free Account</h2>
            <p className="text-muted-foreground mb-8">
              Sign up to save your quiz results, track your progress, and get personalized
              sales tips tailored to your animal type.
            </p>
            <Link href="/signup">
              <Button size="xl" className="press-effect hover-glow">
                Sign Up Now
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-lion-600 via-penguin-600 to-beaver-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">
            Ready to Discover Your Sales Animal?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
            Take the free quiz and get personalized insights in under 5 minutes.
          </p>
          <Link href="/quiz" className="animate-fade-in delay-400 inline-block">
            <Button size="xl" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 press-effect hover-scale">
              Start the Quiz Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
