"use server";
import { auth } from "@/lib/auth";
import { signIn, signOut } from "@/lib/auth-client";

const _signInAction = async () => {
	await auth.api.signInSocial({
		body: {
			provider: "google",
			callbackURL: "/",
		},
	});
};

export const signInAction = async () => {
	await signIn.social({
		provider: "google",
		callbackURL: "/",
	});
};

export const signOutAction = async () => {
	await signOut({
		fetchOptions: {
			onSuccess: () => {
				window.location.href = "/";
			},
		},
	});
};
