import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { companyLinks, companyLinks2, productLinks } from "@/components/nav-links";
import { LinkItem } from "@/components/sheard";

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {/* Product Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Product
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 dark:bg-background">
            <div className="grid w-lg grid-cols-2 gap-2 rounded-md border bg-popover p-2 shadow">
              {productLinks.map((item, i) => (
                <NavigationMenuLink
                  asChild
                  className="w-full flex-row gap-x-2"
                  key={`item-${item.label}-${i}`}
                >
                  <LinkItem {...item} />
                </NavigationMenuLink>
              ))}
            </div>
            <div className="p-2">
              <p className="text-muted-foreground text-sm">
                Ready to get started?{" "}
                <a
                  className="font-medium text-foreground hover:underline"
                  href="/signup"
                >
                  Join Hack Club Builders
                </a>
              </p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Company Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Community
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 pb-1.5 dark:bg-background">
            <div className="grid w-lg grid-cols-2 gap-2">
              <div className="space-y-2 rounded-md border bg-popover p-2 shadow">
                {companyLinks.map((item, i) => (
                  <NavigationMenuLink
                    asChild
                    className="w-full flex-row gap-x-2"
                    key={`item-${item.label}-${i}`}
                  >
                    <LinkItem {...item} />
                  </NavigationMenuLink>
                ))}
              </div>
              <div className="space-y-2 p-3">
                {companyLinks2.map((item, i) => (
                  <NavigationMenuLink
                    className="flex-row items-center gap-x-2"
                    href={item.href}
                    key={`item-${item.label}-${i}`}
                  >
                    <item.icon className="size-4 text-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Pricing / Points */}
        <NavigationMenuLink asChild className="px-4">
          <a className="rounded-md p-2 hover:bg-accent" href="/leaderboard">
            Leaderboard
          </a>
        </NavigationMenuLink>
		<NavigationMenuLink asChild className="px-4">
          <a className="rounded-md p-2 hover:bg-accent" href="/pricing">
            Pricing
          </a>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}