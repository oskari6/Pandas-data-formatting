import { Suspense } from "react";
import OrdersComponent from "../components/OrdersComponent";
import { getOrders } from "../lib/customerSerice";

export default async function OrdersPage() {
  const orders = await getOrders();

  if (!orders) {
    return <p>Customer orders not found</p>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersComponent orders={orders} />;
    </Suspense>
  );
}
