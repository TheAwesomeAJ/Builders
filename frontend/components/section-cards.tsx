import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      {/* Builder Points */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Builder Points Earned</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12,540 XP
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +18%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            More points than last month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Based on merged PRs & completed challenges
          </div>
        </CardFooter>
      </Card>

      {/* Contributions */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Merged Contributions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            342
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -9%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Slight dip this week <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Fewer PRs merged compared to last cycle
          </div>
        </CardFooter>
      </Card>

      {/* Active Builders */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Builders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            128
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +22%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            More builders shipping code <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Counted from commits in the last 7 days
          </div>
        </CardFooter>
      </Card>

      {/* Project Momentum */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Project Momentum</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.7 / 5
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +0.4
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Healthy builder activity <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Based on commits, reviews, and challenge completions
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}
