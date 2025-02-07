"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { InvoiceFormValues } from "@/lib/schemas/invoice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvoiceFormProps {
  form: UseFormReturn<InvoiceFormValues>;
  onSubmit: (data: InvoiceFormValues) => void;
  isLoading: boolean;
}

export function InvoiceForm({ form, onSubmit, isLoading }: InvoiceFormProps) {
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input {...form.register("invoiceNumber")} placeholder="INV-001" />
          {form.formState.errors.invoiceNumber && (
            <p className="text-sm text-red-500">
              {form.formState.errors.invoiceNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input {...form.register("dueDate")} type="date" />
          {form.formState.errors.dueDate && (
            <p className="text-sm text-red-500">
              {form.formState.errors.dueDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name</Label>
        <Input
          {...form.register("clientName")}
          placeholder="Enter client name"
        />
        {form.formState.errors.clientName && (
          <p className="text-sm text-red-500">
            {form.formState.errors.clientName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientEmail">Client Email</Label>
        <Input
          {...form.register("clientEmail")}
          type="email"
          placeholder="client@example.com"
        />
        {form.formState.errors.clientEmail && (
          <p className="text-sm text-red-500">
            {form.formState.errors.clientEmail.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Items</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-4">
            <div className="flex-grow">
              <Input
                {...form.register(`items.${index}.description`)}
                placeholder="Item description"
              />
              {form.formState.errors.items?.[index]?.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.items[index]?.description?.message}
                </p>
              )}
            </div>
            <div className="w-20">
              <Input
                {...form.register(`items.${index}.quantity`, {
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Qty"
              />
              {form.formState.errors.items?.[index]?.quantity && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.items[index]?.quantity?.message}
                </p>
              )}
            </div>
            <div className="w-24">
              <Input
                {...form.register(`items.${index}.price`, {
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Price"
              />
              {form.formState.errors.items?.[index]?.price && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.items[index]?.price?.message}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ description: "", quantity: 1, price: 0 })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          {...form.register("notes")}
          placeholder="Enter any additional notes"
        />
        {form.formState.errors.notes && (
          <p className="text-sm text-red-500">
            {form.formState.errors.notes.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
        <Select
          onValueChange={(value) =>
            form.setValue("cryptocurrency", value as "eth" | "usdc" | "fau")
          }
          defaultValue={form.getValues("cryptocurrency")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select cryptocurrency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eth">Ethereum (ETH)</SelectItem>
            <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
            <SelectItem value="fau">Faucet Token (FAU)</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.cryptocurrency && (
          <p className="text-sm text-red-500">
            {form.formState.errors.cryptocurrency.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="walletAddress">Your Wallet Address</Label>
        <Input
          {...form.register("walletAddress")}
          placeholder="Enter your wallet address"
        />
        {form.formState.errors.walletAddress && (
          <p className="text-sm text-red-500">
            {form.formState.errors.walletAddress.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientWallet">Client's Wallet Address</Label>
        <Input
          {...form.register("clientWallet")}
          placeholder="Enter client's wallet address"
        />
        {form.formState.errors.clientWallet && (
          <p className="text-sm text-red-500">
            {form.formState.errors.clientWallet.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-black hover:bg-zinc-800 text-white transition-colors"
        >
          {isLoading ? "Creating..." : "Create Invoice"}
        </Button>
      </div>
    </form>
  );
}
