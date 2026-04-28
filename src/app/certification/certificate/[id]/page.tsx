import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/server";
import { AnimalType } from "@/types";
import { Award, CheckCircle2, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient();
  const { data: certificate } = await supabase
    .from("certificates")
    .select("*")
    .eq("certificate_number", params.id)
    .single();

  if (!certificate) {
    return {
      title: "Certificate Not Found | Animal Selling",
    };
  }

  return {
    title: `${certificate.user_name}'s Certificate | Animal Selling`,
    description: `Verified Animal Selling Certification for ${certificate.user_name}. Certificate #${certificate.certificate_number}`,
  };
}

export default async function PublicCertificatePage({ params }: Props) {
  const supabase = await createClient();
  const { data: certificate } = await supabase
    .from("certificates")
    .select("*")
    .eq("certificate_number", params.id)
    .single();

  if (!certificate) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAnimalName = (type: string | null) => {
    if (!type) return "Sales Professional";
    const names: Record<string, string> = {
      lion: "Lion",
      penguin: "Penguin",
      retriever: "Golden Retriever",
      beaver: "Beaver",
    };
    return names[type] || type;
  };

  return (
    <div className="py-12 relative overflow-hidden min-h-screen">
      <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Verification Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-green-500 font-medium">Verified Certificate</span>
            </div>
          </div>

          {/* Certificate Display */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl p-8 md:p-12 border-4 border-amber-500/30 shadow-2xl mb-8">
            {/* Certificate Border Decoration */}
            <div className="border-2 border-amber-500/20 rounded-xl p-6 md:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-2 mb-4">
                  <span className="text-2xl">🐾</span>
                  <span className="text-2xl font-bold tracking-wider">
                    ANIMAL <span className="text-amber-500">SELLING</span>™
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-amber-500 tracking-wide">
                  CERTIFICATE OF COMPLETION
                </h1>
              </div>

              {/* Decorative Line */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                <Award className="w-8 h-8 text-amber-500" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              </div>

              {/* Main Content */}
              <div className="text-center mb-8">
                <p className="text-muted-foreground mb-4">This certifies that</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {certificate.user_name}
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  has successfully completed the Animal Selling Certification Program
                  with an average accuracy of{" "}
                  <span className="text-amber-500 font-semibold">
                    {parseFloat(certificate.average_accuracy).toFixed(0)}%
                  </span>{" "}
                  across all assessments.
                </p>
              </div>

              {/* Animal Type */}
              {certificate.primary_animal_type && (
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-gray-800/50 border border-gray-700">
                    <AnimalIcon
                      type={certificate.primary_animal_type as AnimalType}
                      size="md"
                    />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Primary Sales Animal</div>
                      <div className="font-semibold">
                        {getAnimalName(certificate.primary_animal_type)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-800">
                <div className="text-center md:text-left">
                  <div className="text-xs text-muted-foreground mb-1">Certificate Number</div>
                  <div className="font-mono text-sm">{certificate.certificate_number}</div>
                </div>

                <div className="flex items-center gap-2">
                  {(["lion", "penguin", "retriever", "beaver"] as AnimalType[]).map((type) => (
                    <AnimalIcon key={type} type={type} size="sm" />
                  ))}
                </div>

                <div className="text-center md:text-right">
                  <div className="text-xs text-muted-foreground mb-1">Date Issued</div>
                  <div className="text-sm">{formatDate(certificate.completed_at)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Want to earn your own Animal Selling Certification?
            </p>
            <Link href="/certification">
              <Button className="bg-amber-600 hover:bg-amber-700">
                Start Your Certification
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
