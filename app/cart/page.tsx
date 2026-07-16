import type { Metadata } from "next";
import CartPageContent from "@/components/CartPageContent";

export const metadata: Metadata = {
  title: "Your Trip Cart",
  description: "Review and customize your stays, tours, and activities in Manali and request a custom quote.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartPageContent />;
}
