import { Decimal128, ObjectId } from "mongodb";

//return type could be used with ts here but dont know how, (generic Request)
export type Return = {
  customers: CustomerType[];
};

export type Order = {
  description: string;
  price: {$numberDecimal: string};
  _id: ObjectId;
}
export type CustomerType = {
  _id?: ObjectId;
  //id:number;
  name: string;
  industry: string;
  orders?: Order[];
};

export type Props = {
  params: {
    id: string;
  };
};