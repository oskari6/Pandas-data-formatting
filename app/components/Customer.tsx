import Button from "@mui/material/Button"; //do this with / and not {} it is 6 times slower
import Tooltip from "@mui/material/Tooltip";

import PersonIcon from "@mui/icons-material/Person";
import { CustomerType } from "@/app/types/customer";
import Grid from "@mui/material/Grid";
import Link from "next/link";

type props = {
  customer: CustomerType;
};

const Customer = ({ customer }: props) => {
  //other way to use type without props: ({customer}: {customer: CustomerType})
  return (
    <Grid item style={{ marginBottom: 30, padding: 10 }}>
      <span style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Tooltip title={customer._id?.toString()}>
          <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
        </Tooltip>
        {customer.name}
      </span>
      <p>{customer.industry}</p>
      <Link href={{
        pathname: '/orders',
        query: {
          customerId: customer._id?.toString(),
        }
      }}>
        <Button variant="contained">View orders</Button>
      </Link>
    </Grid>
  );
};

export default Customer;
