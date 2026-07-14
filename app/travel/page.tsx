import type { Metadata } from "next";

import PageLenis from "@/components/PageLenis";
import TravelPageContent from "@/components/TravelPageContent";

export const metadata: Metadata = {
  title: "Travel through Manali",
  description:
    "Explore a route-led guide to some of Manali's most memorable stops, from Solang Valley to Rahala Waterfalls.",
};

export default function TravelPage() {
  return (
    <>
      <PageLenis />
      <TravelPageContent />
    </>
  );
}
