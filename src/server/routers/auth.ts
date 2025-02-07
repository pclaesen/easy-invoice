import { deleteSessionTokenCookie, invalidateSession } from "../auth";
import { protectedProcedure, router } from "../trpc";

export const authRouter = router({
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const { session } = ctx;

    await invalidateSession(session!.id);
    await deleteSessionTokenCookie();

    return { success: true };
  }),
});
