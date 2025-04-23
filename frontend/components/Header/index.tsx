import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { auth } from "@/lib/auth";
import LogOutButton from "../LogOut";

const Header = async () => {
  const user = await auth.getAccessToken();
  return (
    <header className="flex h-16 w-full items-center justify-between gap-4 px-4 py-2  bg-gray-800 shadow-lg">
      <Link
        href="/"
        className="text-2xl font-bold bg-gray-600 p-2 rounded flex items-center"
      >
        Redrit
      </Link>
      {user ? (
        <div className="flex gap-4">
          <Link
            href="/create"
            className="font-bold bg-gray-600 p-2 rounded flex items-center"
          >
            Create
          </Link>
          <LogOutButton />
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="font-bold bg-gray-600 p-2 rounded flex items-center"
        >
          Log in
        </Link>
      )}
    </header>
  );
};

export default Header;
