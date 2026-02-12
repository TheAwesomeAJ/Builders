import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Github, Minus } from "lucide-react"
import type { ReactNode } from "react"
import { ModeToggle } from "./theme-toggle"

export function SiteHeader({
  title = "Documents",
  children,
}: {
  title?: string
  children?: ReactNode
}) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 self-center" />
        <Minus className="-ml-1 self-center size-6" />
        <h1 className="text-base font-medium leading-none">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {children ?? (
            <>
            <ModeToggle />
            <Button variant="outline" asChild size="sm" className="hidden sm:flex">
              <a
                href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
                rel="noopener noreferrer"
                target="_blank"
                className="dark:text-foreground"
              >
                <Github />
                GitHub
              </a>
            </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
