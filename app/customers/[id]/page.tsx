// app/customers/[id]/page.tsx
import { notFound } from "next/navigation";
import { getCustomerById } from "@/app/lib/customerSerice";
import { Props } from "@/app/types/customer";

export const revalidate = 60; // 1min

export default async function CustomerId({ params }: Props) {
  const customer = await getCustomerById(params.id);

  if (!customer) {
    return notFound();
  }

  return (
    <>
      <p>Customer: {customer.name}</p>
      <p>Industry: {customer.industry}</p>
      <p>ID: {customer._id}</p>
    </>
  );
}
