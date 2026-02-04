"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

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
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Contributions",
      url: "/contributions",
      icon: IconListDetails,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconFolder,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Challenges",
      icon: IconCamera,
      isActive: true,
      url: "/challenges",
      items: [
        {
          title: "Active Challenges",
          url: "/challenges/active",
        },
        {
          title: "Completed",
          url: "/challenges/completed",
        },
      ],
    },
    {
      title: "Repositories",
      icon: IconFileDescription,
      url: "/repos",
      items: [
        {
          title: "Official Repos",
          url: "/repos/official",
        },
        {
          title: "Archived",
          url: "/repos/archived",
        },
      ],
    },
    {
      title: "Automation",
      icon: IconFileAi,
      url: "/automation",
      items: [
        {
          title: "Active Rules",
          url: "/automation/active",
        },
        {
          title: "History",
          url: "/automation/history",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/search",
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
      url: "/reports",
      icon: IconReport,
    },
    {
      name: "Scoring Rules",
      url: "/scoring",
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
                <span className="text-base font-semibold">Hack Club Builders</span>
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
