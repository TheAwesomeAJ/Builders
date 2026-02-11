"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { House, GitMerge } from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "builder",
    email: "builder@hackclub.com",
    avatar: "/avatars/builder.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/app",
      icon: House,
    },
    {
      title: "Contributions",
      url: "/app/contributions",
      icon: GitMerge,
    },
    {
      title: "Leaderboard",
      url: "/app/leaderboard",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "/app/projects",
      icon: IconFolder,
    },
    {
      title: "Teams",
      url: "/app/teams",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Challenges",
      icon: IconCamera,
      isActive: true,
      url: "/app/challenges",
      items: [
        {
          title: "Active Challenges",
          url: "/app/challenges/active",
        },
        {
          title: "Completed",
          url: "/app/challenges/completed",
        },
      ],
    },
    {
      title: "Repositories",
      icon: IconFileDescription,
      url: "/app/repos",
      items: [
        {
          title: "Official Repos",
          url: "/app/repos/official",
        },
        {
          title: "Archived",
          url: "/app/repos/archived",
        },
      ],
    },
    {
      title: "Automation",
      icon: IconFileAi,
      url: "/app/automation",
      items: [
        {
          title: "Active Rules",
          url: "/app/automation/active",
        },
        {
          title: "History",
          url: "/app/automation/history",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/app/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/app/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/app/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Builder Docs",
      url: "/docs",
      icon: IconDatabase,
    },
    {
      name: "Contribution Reports",
      url: "/app/reports",
      icon: IconReport,
    },
    {
      name: "Scoring Rules",
      url: "/help/scoring",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <svg
                  className="size-5!"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <image href="https://assets.hackclub.com/icon-rounded.svg" width="32" height="32" />
                </svg>
                <span className="text-base font-semibold">HC Builders Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
