"use server";

import { headers } from "next/headers";

import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { encodedRedirect } from "~/utils/misc";
import { createClient } from "~/utils/supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword") as string;
  const match = formData.get("match") as string;

  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password || !confirmPassword) {
    return { error: "Email and password and confirmed password are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else if (!error && data && match) {
    await api.match.update({ id: match, player2Id: data.user?.id });
    return redirect(`/match/${match}`);
  } else {
    return redirect("/welcome");
  }
};

export const welcomeAction = async (formData: FormData) => {
  const name = formData.get("name") as string;

  try {
    await api.user.create({ name });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return encodedRedirect("error", "/welcome", error.message);
    }
    return encodedRedirect(
      "error",
      "/welcome",
      "An unknown error occurred. Please try again or contact us.",
    );
  }

  return redirect("/home");
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/log-in", error.message);
  }

  return redirect("/home");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/settings/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/settings/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/settings/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/settings/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/settings/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/log-in");
};
