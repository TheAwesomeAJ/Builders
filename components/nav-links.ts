import {
  BarChart,
  Code,
  BookOpen,
  Globe,
  Users,
  UserPlus,
  Award,
  Badge,
  Layers,
  Zap,
  Shield,
  Star,
  HelpCircle,
  GitBranch,
} from "lucide-react";
import type { LinkItemType } from "@/components/sheard";

export const productLinks: LinkItemType[] = [
  {
    label: "Project Dashboard",
    href: "/dashboard",
    description: "View and manage your Hack Club contributions",
    icon: Layers,
  },
  {
    label: "Build Projects",
    href: "/projects",
    description: "Start new projects or contribute to existing ones",
    icon: Code,
  },
  {
    label: "Community Challenges",
    href: "/challenges",
    description: "Join gamified challenges and earn points",
    icon: Zap,
  },
  {
    label: "Leaderboards",
    href: "/leaderboard",
    description: "Track top contributors and see your rank",
    icon: BarChart,
  },
  {
    label: "Integrations",
    href: "/integrations",
    description: "Connect your projects with Hack Club tools",
    icon: Globe,
  },
  {
    label: "Contribution API",
    href: "/api-docs",
    description: "Build custom tools using Hack Club Builders API",
    icon: GitBranch,
  },
];

export const companyLinks: LinkItemType[] = [
  {
    label: "About Hack Club Builders",
    href: "/about",
    description: "Learn more about our mission and community",
    icon: Users,
  },
  {
    label: "Success Stories",
    href: "/stories",
    description: "See how builders have leveled up their skills",
    icon: Star,
  },
  {
    label: "Join a Team",
    href: "/teams",
    description: "Collaborate with other Hack Clubbers",
    icon: UserPlus,
  },
];

export const companyLinks2: LinkItemType[] = [
  {
    label: "Terms of Service",
    href: "/tos",
    icon: Shield,
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
    icon: Badge,
  },
  {
    label: "Refund Policy",
    href: "/refund",
    icon: Award,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
  {
    label: "Help Center",
    href: "/help",
    icon: HelpCircle,
  },
];