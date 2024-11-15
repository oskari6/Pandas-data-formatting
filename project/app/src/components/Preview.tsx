import Image from "next/image";
import House from "../interfaces/House";

const Preview = ({ house }: { house: House }) => {
  return (
    <div className="relative w-[300px] h-[290px] flex flex-col shadow-xl rounded-xl">
      <div className="w-full h-[180px] relative rounded-t-xl overflow-hidden">
        <Image
          src={house.photos[0]?.photo_url} // Path to your image
          alt={house.address}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <h4>${house.price}</h4>
        <div className="flex text-[14px]">
          <div className="h-[25px] p-1 border-r-2 border-gray-300">
            <b>{house.bed}</b>
            <abbr>bds</abbr>
          </div>
          <div className=" h-[25px] p-1 border-r-2 border-gray-300">
            <b>{house.bath}</b>
            <abbr>ba</abbr>
          </div>
          <div className=" h-[25px] p-1">
            <b>{house.house_size > BigInt(0) && house.house_size}</b>
            {house.house_size > BigInt(0) && <abbr>sqft</abbr>} - House for sale
          </div>
        </div>
      </div>
      <span className="text-[14px]">{house.address}</span>
      <span className="text-[10px]">{house.brokered_by || null}</span>
      <span className="text-white absolute top-2 left-2 p-1 bg-black/50 rounded-xl text-[12px] font-bold">
        {house.property_type || null}
      </span>
      <div className="absolute top-2 right-2">
        <button>
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="gray"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Preview;
