// @/src/server/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import { db } from "./db";
import { getCurrentSession } from "./auth";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;
  const { session, user } = await getCurrentSession();

  const ip = "";

  return {
    req,
    res,
    session,
    user,
    db,
    ip,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
