import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { CustomerType } from "@/app/types/customer";
import {
  deleteCustomer,
  editCustomer,
  getCustomer,
} from "@/app/lib/customerSerice";
import { Params } from "@/app/interfaces/params";

export async function GET(req: Request, { params }: Params) {
  const id = params.id!;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
  }

  const customer = await getCustomer(id);

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  console.log("Customer:", customer);
  return NextResponse.json({ customer });
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();

    if (body.name && body.industry) {
      const customer: CustomerType = {
        name: body.name,
        industry: body.industry,
        orders: body.orders,
      };

      const updateResult = await editCustomer(params.id, customer);

      if (updateResult.modifiedCount > 0) {
        await revalidatePath("/customers");
        return NextResponse.json(
          { message: "Customer updated successfully" },
          { status: 200 }
        );
      } else {
        throw new Error("Failed to update customer");
      }
    } else {
      return NextResponse.json(
        { error: "name and industry are required." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "updating customer failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const deletedCustomer = await deleteCustomer(params.id);

    if (deletedCustomer.deletedCount > 0) {
      await revalidatePath("/customers");
      return NextResponse.json(
        { message: "Customer deleted successfully" },
        { status: 200 }
      );
    } else {
      throw new Error("Failed to delete customer");
    }
  } catch (error) {
    return NextResponse.json(
      { error: "deleting customer failed" },
      { status: 500 }
    );
  }
}
