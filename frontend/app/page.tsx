import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center -mt-16 py-10 lg:py-16 bg-white dark:bg-background transition-colors">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              🚀 Build & Earn
              <ArrowUpRight />
            </Badge>
            <h1 className="font-heading my-4 text-4xl text-balance md:text-5xl lg:leading-14">
              Hack Club Builders
            </h1>
            <p className="text-muted-foreground mb-8 text-balance lg:text-lg">
              Contribute to Hack Club projects, track your commits, and level up with rewards.
              Every contribution counts—build, earn points, and climb the ranks!
            </p>
            <div className="flex justify-center gap-2">
              <Button asChild>
                <Link href="/auth/start">Join the Builders</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/leaderboard">See the Leaderboard</Link>
              </Button>
            </div>
          </header>
            <Image
              src="https://assets.hackclub.com/flag-standalone.svg"
              alt="Dashboard interface of the SaaS platform"
              className="w-full rounded-md object-cover bg-white dark:bg-zinc-900 transition-colors"
              width={1200}
              height={800}
            />
          </div>
        </div>
      </section>
  );
}