import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <nav className="text-xl pb-3 ">
      <ul className="flex h-[10%] justify-center items-center border-b-2 border-grey-500">
        <li className="p-5">
          <Link className="w-full" href="/">
            Rent
          </Link>
        </li>
        <li className="p-5">
          <Link className="w-full" href="/">
            Sell
          </Link>
        </li>
        <li>
          <Link className="w-full p-5" href="/">
            <Image
              src="/logo.png" // Path to your image
              alt="logo"
              width={50} // Set exact width to 50px
              height={50} // Set exact height to 50px
            />
          </Link>
        </li>
        <li className="p-5">
          <Link className="w-full" href="/buy">
            Buy
          </Link>
        </li>
        <li className="p-5">
          <Link className="w-full" href="/login">
            Sign In
          </Link>
        </li>
      </ul>
    </nav>
  );
};
