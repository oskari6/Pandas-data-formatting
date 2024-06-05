import { NextResponse } from "next/server";
import { CustomerType, Order } from "@/app/types/customer";
import { addCustomer, getCustomers } from "@/app/lib/customerSerice";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const corsHeaders: any = {
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const data = await getCustomers();

  const response = NextResponse.json({ customers: data });
  Object.keys(corsHeaders).forEach((key) => {
    response.headers.set(key, corsHeaders[key]);
  });

  return response;
}

// POST method to add a new customer
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.name && body.industry) {
      const customer: CustomerType = {
        name: body.name,
        industry: body.industry,
        orders: body.orders.map((order : Order) => {
          return {...order, _id: new ObjectId()}
        }),
      };
      const insertedId = await addCustomer(customer);

      if (insertedId) {
        await revalidatePath("/customers");
        return NextResponse.json(
          { message: "Customer added successfully", customer: insertedId },
          { status: 201 }
        );
      } else {
        throw new Error("Failed to add customer");
      }
    } else {
      return NextResponse.json(
        { error: "name and industry are required." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "error message" }, { status: 500 });
  }
}
