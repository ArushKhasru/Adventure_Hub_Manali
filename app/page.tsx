import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Adventure Hub Manali",
  description:
    "Discover Manali stays, travel, tours, and outdoor activities for families and adventure travelers—all planned in one place.",
};

export default function HomePage() {
  return <HomePageContent />;
}
