import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Start your Manali plan",
  description:
    "Build a quick Manali trip brief and see the contact options Adventure Hub Manali is preparing.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
