import HouseAmenity from "./HouseAmenity";
import HouseFeature from "./HouseFeature";
import HouseLocation from "./HouseLocation";
import HousePhoto from "./HousePhoto";
import HouseAgent from "./HousePhoto";

export default interface House {
  status: string;
  price: number;
  bed: bigint;
  bath: bigint;
  acre_lot: number;
  house_size: bigint;
  prev_sold_date: Date | null;
  house_id: bigint;
  year_built?: bigint;
  created_at: Date;
  address: string;
  location: HouseLocation;
  photos?: HousePhoto[];
  agent?: HouseAgent;
  features?: HouseFeature[];
  amenities?: HouseAmenity[];
}
