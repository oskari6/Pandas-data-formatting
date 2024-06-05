"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomerType } from "@/app/types/customer";
import Customer from "../components/Customer";
import Grid from "@mui/material/Grid";
import { YoutubeSearchedForOutlined } from "@mui/icons-material";
import Container from "@mui/material/Container";

const Customers = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axios.get("/api/customers");
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      YoutubeSearchedForOutlined;
      setCustomers(data.customers);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Container>
      <Grid container spacing={5} sx={{ mt: 1 }}>
        {customers.map((customer: CustomerType) => {
          return (
            <Customer key={customer._id?.toString()} customer={customer} />
          );
        })}
      </Grid>
    </Container>
  );
};

export default Customers;
