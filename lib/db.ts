import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export type ContributionRow = {
  id: number
  repository: string
  prNumber: string
  status: string
  reviewer: string | null
  potentialPoints: number | null
  earnedPoints: number | null
  solvedIssueNumbers: string | null
}

export async function getContributions(): Promise<ContributionRow[]> {
  // select all columns to avoid "column does not exist" errors
  const res = await pool.query(`SELECT * FROM contributions ORDER BY id`)

  return res.rows.map((r: Record<string, any>) => {
    const repository =
      r.repository ?? r.repo ?? r.repo_name ?? r.repository_name ?? r.header ?? r.title ?? ""

    const prNumber =
      r.pr_number ?? r.pr ?? r.prnum ?? r.pull_request_number ?? ""

    const status = r.status ?? r.state ?? ""

    const reviewer = r.reviewer ?? r.reviewed_by ?? r.assignee ?? null

    const potentialPoints =
      r.potential_points ?? r.potentialPoints ?? r.points_possible ?? null

    const earnedPoints = r.earned_points ?? r.earnedPoints ?? r.points_earned ?? null

    const solvedIssueNumbers =
      r.solved_issue_numbers ?? r.solved_issues ?? r.issues ?? null

    return {
      id: Number(r.id),
      repository: String(repository),
      prNumber: prNumber != null ? String(prNumber) : "",
      status: String(status),
      reviewer: reviewer == null ? null : String(reviewer),
      potentialPoints: potentialPoints == null ? null : Number(potentialPoints),
      earnedPoints: earnedPoints == null ? null : Number(earnedPoints),
      solvedIssueNumbers: solvedIssueNumbers == null ? null : String(solvedIssueNumbers),
    }
  })
}

export async function closePool() {
  await pool.end()
}
