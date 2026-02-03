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
			} catch (err) {
				// If signOut fails, redirect to home as a fallback
				router.replace("/");
			}
		})();
	}, [router]);

	return <p>Signing out…</p>;
}

