import Image from "next/image";
import React, { JSX } from "react";

const PrivateAccount = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full items-center justify-center my-10">
      <div className="flex">
        <Image
          src={"/images/shield.png"}
          alt="private"
          height={200}
          width={200}
        />
      </div>

      <p className="text-xl">This account is private. </p>
      <p className="text-xl">Follow this user to access their posts.</p>
    </div>
  );
};

export default PrivateAccount;
