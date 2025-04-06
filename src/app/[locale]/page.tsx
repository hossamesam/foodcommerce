import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import BestSellers from "./_components/BestSellers";
import { db } from "@/lib/prisma";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footre from "@/components/footer";
import getTrans from "@/lib/translation";
import { Languages } from "@/constants/enums";
import { headers } from "next/headers";
import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

export default async function Home() {

  const locale = await getCurrentLocale()
  const { hero, about, bestSeller, contact } = (await getTrans(locale)).home;


  return (
    <main className="relative">
      <Hero />
      <BestSellers />
      <About />
      <Contact />
      <Footre />
    </main>
  );
}
