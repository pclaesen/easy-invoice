import { authRouter } from "./routers/auth";
import { invoiceRouter } from "./routers/invoice";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  invoice: invoiceRouter,
});

export type AppRouter = typeof appRouter;
