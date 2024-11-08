//schema
import {HydratedDocument, Schema, model} from 'mongoose';

//example of interfaces
//? is optional
interface IOrder{
  description: string,
  amountIncents?: number
};

interface ICustomer{
  name: string,
  industry?: string,
  orders?: IOrder[]
};

const customerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true
  },
  industry: String,
  orders: [
    {
        description: String,
        amountInCents: Number
    }
  ]
});

const Customer = model('customer', customerSchema);
const c: HydratedDocument<ICustomer> = new Customer ({
  name: "test123",
  industry: "test123"
});

export default Customer;