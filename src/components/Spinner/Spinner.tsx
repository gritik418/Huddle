import Image from "next/image";
import React, { JSX } from "react";

const Spinner = ({
  variant,
}: {
  variant: "xs" | "small" | "medium" | "large" | null;
}): JSX.Element => {
  switch (variant) {
    case "xs":
      return (
        <Image
          height={24}
          width={24}
          src={"/images/loading.gif"}
          alt="loading"
        />
      );

    case "small":
      return (
        <Image
          height={30}
          width={30}
          src={"/images/loading.gif"}
          alt="loading"
        />
      );
    case "medium":
      return (
        <Image
          height={60}
          width={60}
          src={"/images/loading.gif"}
          alt="loading"
        />
      );
    case "large":
      return (
        <Image
          height={80}
          width={80}
          src={"/images/loading.gif"}
          alt="loading"
        />
      );
    default:
      return (
        <Image
          height={20}
          width={20}
          src={"/images/loader.gif"}
          alt="loading"
        />
      );
  }
};

export default Spinner;
