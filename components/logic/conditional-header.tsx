"use client";
import React, { useEffect, useState } from "react";

type PathPattern = string | RegExp;

interface ConditionalHeaderProps {
	header?: React.ReactElement | null;
	children?: React.ReactNode;
	excludedPaths?: PathPattern[]; // supports exact, prefix (trailing '*') or RegExp
	currentPath?: string; // optional override (useful for SSR or tests)
}

export default function ConditionalHeader({
	header = null,
	children = null,
	excludedPaths = ["/login", "/signup", "/admin*"],
	currentPath,
}: ConditionalHeaderProps) {
	// initialize to null to match server render (avoid reading window on first render)
	const [path, setPath] = useState<string | null>(currentPath ?? null);

	useEffect(() => {
		// Set path after mount so initial client render matches server output.
		if (currentPath) {
			setPath(currentPath);
		} else if (typeof window !== "undefined") {
			setPath(window.location.pathname);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPath]);

	const matchesPattern = (p: PathPattern, current: string) => {
		if (typeof p === "string") {
			if (p.endsWith("*")) {
				const prefix = p.slice(0, -1);
				return current.startsWith(prefix);
			}
			return current === p;
		}
		return p.test(current);
	};

	const isExcluded = path ? excludedPaths.some((pat) => matchesPattern(pat, path)) : false;

	// If path is unknown (e.g. during SSR) and no override provided, avoid rendering the header to prevent mismatch.
	if (!path && !currentPath) {
		return <>{children}</>;
	}

	return <>{isExcluded ? children : <>{header}{children}</>}</>;
}
