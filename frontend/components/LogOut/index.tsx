"use client";
import { LogOut } from "@/actions/logout";

const LogOutButton = () => {
  return (
    <button
      onClick={() => LogOut()}
      className="font-bold bg-gray-600 p-2 rounded cursor-pointer"
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
