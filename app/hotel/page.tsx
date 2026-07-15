import type { Metadata } from "next";
import HotelHeroExplorer from "@/components/HotelHeroExplorer";
import HotelListing from "@/components/HotelListing";
import PageLenis from "@/components/PageLenis";

export const metadata: Metadata = {
  title: "Mountain stays in Manali",
  description: "Discover mountain-view hotels and stays across Manali.",
};

export default function HotelPage() {
  return <><PageLenis /><HotelHeroExplorer /><HotelListing /></>;
}