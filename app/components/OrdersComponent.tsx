"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Order } from "@/app/types/customer";
import { ObjectId } from "mongodb";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 90 },
  { field: "customerId", headerName: "Customer ID", width: 90 },
  { field: "customerName", headerName: "Customer", width: 150 },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 400,
  },
  {
    field: "orderPrice",
    headerName: "Price",
    width: 150,
    sortable: true,
    type: "number",
  },
];

export interface OrderRow extends Order {
  orderPrice: Number;
  customerName: string;
  customerId?: ObjectId;
  id: ObjectId;
}

export interface OrdersComponentProps{
  orders: Order[];
}

const OrdersComponent: React.FC<OrdersComponentProps> = ({ orders }) => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  return (
    <Container>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{//all on initial load
            items: [
              {
                field: "customerId",
                operator: "equals",
                value: customerId,
              },
            ],
          }}
          rows={orders}
          columns={columns}
          initialState={{
            filter: {
              filterModel: {
                items: [
                  {
                    field: "customerId",
                    operator: "equals",
                    value: customerId,
                  },
                ],
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default OrdersComponent;
