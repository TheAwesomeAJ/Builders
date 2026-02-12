"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

type UnknownRecord = Record<string, unknown>;

function isRecord(v: unknown): v is UnknownRecord {
  return typeof v === "object" && v !== null;
}

function getString(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return null;
}

function getBoolean(v: unknown): boolean | null {
  return typeof v === "boolean" ? v : null;
}

function getDateString(v: unknown): string | null {
  if (!v) return null;
  if (typeof v === "string") return v;
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

export default function StatusPage() {
  const [mounted, setMounted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [serverTime, setServerTime] = useState<string | null>(null);

  const [sessionData, setSessionData] = useState<UnknownRecord | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    (async () => {
      try {
        const res = await authClient.getSession();
        if (!alive) return;

        // Better Auth session payload
        const payload = (res as unknown as { data?: unknown })?.data;

        setSessionData(isRecord(payload) ? payload : null);
        setServerTime(new Date().toISOString());
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        if (alive) setError(msg);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const user = isRecord(sessionData?.user)
    ? sessionData.user
    : null;

  const accounts = Array.isArray(sessionData?.accounts)
    ? sessionData.accounts
    : [];

  const sessions = Array.isArray(sessionData?.sessions)
    ? sessionData.sessions
    : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Status (dev)</h1>

      <div className="space-y-4">
        <Card className="p-4">
          <h2 className="font-medium">Server</h2>
          <div className="text-sm text-muted-foreground">
            Server Time: {serverTime ?? "-"}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-medium">Session (raw)</h2>

          {loading && <div className="text-sm">Loading…</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}

          {!loading && !error && (
            <pre className="text-xs whitespace-pre-wrap">
              {sessionData ? JSON.stringify(sessionData, null, 2) : "-"}
            </pre>
          )}
        </Card>

        <Card className="p-4">
          <h2 className="font-medium">User</h2>

          {!loading && !error && user && (
            <div className="text-sm mt-2 space-y-1">
              <div>
                <span className="text-muted-foreground">id:</span>{" "}
                {getString(user.id) ?? "-"}
              </div>
              <div>
                <span className="text-muted-foreground">name:</span>{" "}
                {getString(user.name) ?? "-"}
              </div>
              <div>
                <span className="text-muted-foreground">email:</span>{" "}
                {getString(user.email) ?? "-"}
              </div>
              <div>
                <span className="text-muted-foreground">
                  emailVerified:
                </span>{" "}
                {getBoolean(user.emailVerified) === null
                  ? "-"
                  : getBoolean(user.emailVerified)
                  ? "true"
                  : "false"}
              </div>
              <div>
                <span className="text-muted-foreground">image:</span>{" "}
                {getString(user.image) ?? "-"}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h2 className="font-medium">Connected Accounts</h2>

          {!loading && !error && (
            <>
              {accounts.length > 0 ? (
                <table className="w-full table-auto text-left text-sm">
                  <thead>
                    <tr>
                      <th className="pr-4">provider</th>
                      <th className="pr-4">providerAccountId</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((acc, i) => (
                      <tr key={`acc-${i}`} className="odd:bg-muted">
                        <td className="pr-4">
                          {getString((acc as any).provider) ?? "-"}
                        </td>
                        <td className="pr-4 truncate max-w-xs">
                          {getString((acc as any).providerAccountId) ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No accounts found.
                </div>
              )}
            </>
          )}
        </Card>

        <Card className="p-4">
          <h2 className="font-medium">Sessions (all)</h2>

          {!loading && !error && (
            <>
              {sessions.length > 0 ? (
                <table className="w-full table-auto text-left text-sm">
                  <thead>
                    <tr>
                      <th className="pr-4">id</th>
                      <th className="pr-4">expiresAt</th>
                      <th className="pr-4">ip</th>
                      <th className="pr-4">ua</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((ses, i) => (
                      <tr key={`sess-${i}`} className="odd:bg-muted">
                        <td className="pr-4 truncate max-w-xs">
                          {getString((ses as any).id) ?? "-"}
                        </td>
                        <td className="pr-4">
                          {getDateString((ses as any).expiresAt) ?? "-"}
                        </td>
                        <td className="pr-4">
                          {getString((ses as any).ipAddress) ?? "-"}
                        </td>
                        <td className="pr-4 truncate max-w-sm">
                          {getString((ses as any).userAgent) ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No sessions found.
                </div>
              )}
            </>
          )}
        </Card>

        <Card className="p-4">
          <h2 className="font-medium">Client Info</h2>
          <div className="text-sm mt-2">
            Navigator: {mounted ? navigator.userAgent : "-"}
          </div>
          <div className="text-sm">
            Platform: {mounted ? navigator.platform : "-"}
          </div>
        </Card>
      </div>
    </div>
  );
}