"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LogoutPage() {
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				await authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							router.push("/");
						},
					},
				});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (err) {
				// If signOut fails, redirect to home as a fallback
				router.replace("/error?message=Failed%20to%20sign%20out");
			}
		})();
	}, [router]);

	return <p>Signing out…</p>;
}

