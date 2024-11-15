import HousePhoto from "./HousePhoto";

export default interface House {
  brokered_by: string;
  status: string;
  price: number;
  bed: bigint;
  bath: bigint;
  acre_lot: number;
  house_size: bigint;
  prev_sold_date: Date | null;
  house_id: bigint;
  year_built: bigint;
  property_type: string;
  created_at: Date;
  address: string;
  location_id: bigint;
  photos: HousePhoto[];
}
