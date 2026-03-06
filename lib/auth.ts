import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE = "admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Stateless session management using HMAC signature
async function sign(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Buffer.from(signature)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function verify(
  data: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const expectedSignature = await sign(data, secret);
  return signature === expectedSignature;
}

export async function createAdminSession(): Promise<string> {
  const payload = JSON.stringify({ admin: true, createdAt: Date.now() });
  const secret = getAdminPassword();
  const signature = await sign(payload, secret);
  const token = `${payload}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return token;
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const secret = getAdminPassword();
  if (!(await verify(payload, signature, secret))) return false;

  // Optional: Check expiration based on payload.createdAt
  // const data = JSON.parse(payload);
  // if (Date.now() - data.createdAt > SESSION_MAX_AGE * 1000) return false;

  return true;
}

export async function isAuthenticatedFromRequest(
  request: NextRequest,
): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const secret = getAdminPassword();
  return await verify(payload, signature, secret);
}

export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD environment variable is not set");
  }
  return password;
}
