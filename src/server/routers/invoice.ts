import { CURRENCY_VALUE } from "@/lib/currency";
import { invoiceFormSchema } from "@/lib/schemas/invoice";

import { ethers } from "ethers";
import { protectedProcedure, router } from "../trpc";

export const invoiceRouter = router({
	create: protectedProcedure
		.input(invoiceFormSchema)
		.mutation(async ({ ctx, input }) => {
			try {
				const { user, db } = ctx;

				return { success: true };
			} catch (error) {
				console.log("Error: ", error);
				return { success: false };
			}
		}),
});
