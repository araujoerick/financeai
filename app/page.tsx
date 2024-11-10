import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/navbar";

const Home = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full items-center justify-center">
        <UserButton showName />
      </div>
    </>
  );
};

export default Home;
