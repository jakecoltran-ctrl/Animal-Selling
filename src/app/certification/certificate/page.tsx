"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/client";
import { getCertificate, getCertificationStatus } from "@/lib/certification";
import { Certificate, AnimalType } from "@/types";
import {
  ArrowLeft,
  Download,
  Share2,
  Award,
  Loader2,
  Lock,
  ExternalLink,
} from "lucide-react";

export default function CertificatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadCertificate() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login?redirect=/certification/certificate");
        return;
      }

      try {
        const status = await getCertificationStatus(user.id);
        setIsComplete(status.isComplete);

        if (status.certificate) {
          setCertificate(status.certificate);
        }
      } catch (error) {
        console.error("Error loading certificate:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCertificate();
  }, [router]);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#0a0a0f",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`animal-selling-certificate-${certificate?.certificateNumber}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/certification/certificate/${certificate?.certificateNumber}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Animal Selling Certification",
          text: `I earned my Animal Selling Certification! Check it out:`,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert("Certificate link copied to clipboard!");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAnimalName = (type: AnimalType | string | null) => {
    if (!type) return "Sales Professional";
    const names: Record<string, string> = {
      lion: "Lion",
      penguin: "Penguin",
      retriever: "Golden Retriever",
      beaver: "Beaver",
    };
    return names[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Not completed yet
  if (!isComplete || !certificate) {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Button
              variant="ghost"
              className="mb-8"
              onClick={() => router.push("/certification")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Certification
            </Button>

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
                <Lock className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">Certificate Locked</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete all four games with 80% accuracy to unlock your certificate.
            </p>

            <Button onClick={() => router.push("/certification")}>
              Continue Training
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 relative overflow-hidden min-h-screen">
      <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => router.push("/certification")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Certification
          </Button>

          {/* Certificate Preview */}
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl p-8 md:p-12 border-4 border-amber-500/30 shadow-2xl mb-8"
          >
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
                  {certificate.userName}
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  has successfully completed the Animal Selling Certification Program
                  with an average accuracy of{" "}
                  <span className="text-amber-500 font-semibold">
                    {certificate.averageAccuracy.toFixed(0)}%
                  </span>{" "}
                  across all assessments.
                </p>
              </div>

              {/* Animal Type */}
              {certificate.primaryAnimalType && (
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-gray-800/50 border border-gray-700">
                    <AnimalIcon
                      type={certificate.primaryAnimalType as AnimalType}
                      size="md"
                    />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Primary Sales Animal</div>
                      <div className="font-semibold">
                        {getAnimalName(certificate.primaryAnimalType)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-800">
                <div className="text-center md:text-left">
                  <div className="text-xs text-muted-foreground mb-1">Certificate Number</div>
                  <div className="font-mono text-sm">{certificate.certificateNumber}</div>
                </div>

                <div className="flex items-center gap-2">
                  {(["lion", "penguin", "retriever", "beaver"] as AnimalType[]).map((type) => (
                    <AnimalIcon key={type} type={type} size="sm" />
                  ))}
                </div>

                <div className="text-center md:text-right">
                  <div className="text-xs text-muted-foreground mb-1">Date Issued</div>
                  <div className="text-sm">{formatDate(certificate.completedAt)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-700">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Certificate
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                window.open(
                  `/certification/certificate/${certificate.certificateNumber}`,
                  "_blank"
                )
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Public Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
