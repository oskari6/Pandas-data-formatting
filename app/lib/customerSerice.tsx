import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { CustomerType, Order } from "../types/customer";
import { NextResponse } from "next/server";
import { OrderRow } from "../components/OrdersComponent";

export const addCustomer = async (
  customer: Omit<CustomerType, "_id">
): Promise<ObjectId> => {
  const mongoClient = await clientPromise;
  const response = mongoClient.db().collection("customers").insertOne(customer);

  return (await response).insertedId;
};

export const getCustomers = async (): Promise<CustomerType[]> => {
  //promise types optional, good practice
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db()
    .collection("customers")
    .find()
    .toArray()) as CustomerType[];

  return JSON.parse(JSON.stringify(data));
};

export const getCustomer = async (
  id: string | ObjectId
): Promise<CustomerType | null> => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;
  const customer = (await mongoClient
    .db()
    .collection("customers")
    .findOne({ _id: id })) as CustomerType;

  return customer as CustomerType | null;
};

export async function fetchCustomers(): Promise<CustomerType[]> {
  const data = await getCustomers();

  console.log("!!!", data);

  return data;

  // const result = await axios.get<{
  //   customers: Customer[];
  // }>("http://127.0.0.1:8000/api/customers/");
  //console.log(result.data);

  //return result.data.customers;
}

// export async function getAllIds() {
//   const mongoClient = await clientPromise;

//   const data = await mongoClient
//     .db()
//     .collection("customers")
//     .find({})
//     .toArray();

//   const ids = data.map((customer: WithId<Document>) => {
//     return { params: { id: customer._id.toString() } };
//   });

//   return ids;

//   /*try {
//       const result = await axios.get(`http://127.0.0.1:8000/api/customers`); //after get allows to see what props are available

//       const paths = result.data.customers.map((customer: Customer) => {
//         console.log(customer.id);
//         return { params: { id: customer.id.toString() } };
//       });

//       // Ensure the response structure is as expected
//       if (result.data && result.data.customer) {
//         return {
//           paths: paths,
//           //lazy cache
//           //paths: []
//           fallback: true,
//           //web crawlers get the data from source code of the page
//           //fallback: 'blocking',
//         };
//       } else {
//         console.error("Unexpected response structure:", result.data);
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching customer data:", error);
//       return null;
//     }*/
// }

export async function getCustomerById(id: string) {
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
  }

  const customer = await getCustomer(id);

  if (customer) {
    return JSON.parse(JSON.stringify(customer));
  } else {
    console.error("Customer not found");
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }
  /*try {
    const result = await axios.get<{ customer: Customer }>(
      `http://127.0.0.1:8000/api/customers/${id}`
    ); //after get allows to see what props are available
    console.log("API Response:", result.data);

    // Ensure the response structure is as expected
    if (result.data && result.data.customer) {
      return result.data.customer;
    } else {
      console.error("Unexpected response structure:", result.data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
    return null;
  }*/
}

export const editCustomer = async (
  id: string | Object,
  customer: CustomerType
) => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;

  const response = await mongoClient
    .db()
    .collection("customers")
    .replaceOne({ _id: id }, customer);

  return response;
};

export const deleteCustomer = async (id: string | ObjectId) => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;

  return await mongoClient.db().collection("customers").deleteOne({ _id: id });
};

export const getOrders = async () => {
  const customers = await getCustomers();
  let orders: OrderRow[] = [];
  customers.forEach((customer : CustomerType) => {
    if (customer.orders) {
      customer.orders.forEach((order : Order) => {
        orders.push({
          ...order,
          customerName: customer.name,
          customerId: customer._id,
          id: order._id,
          orderPrice: Number(order.price.$numberDecimal),
        });
      });
    }
  });
  return orders;
  // .map((customer) => {
  //   return customer.orders || null;
  // })
  // .flat(1).filter((order) => {
  //   return order !== null;
  // }),
};
