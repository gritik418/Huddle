import Image from "next/image";
import React, { JSX } from "react";

const Spinner = ({
  variant,
  loader,
}: {
  variant: "xs" | "small" | "medium" | "large" | null;
  loader?: "bird" | "loader" | "White-loader" | null;
}): JSX.Element => {
  let loaderGif: string = "";

  if (loader === "loader") {
    loaderGif = "/images/loading.gif";
  } else if (loader === "bird") {
    loaderGif = "/images/bird-loading.gif";
  } else if (loader === "White-loader") {
    loaderGif = "/images/loader.gif";
  } else {
    loaderGif = "/images/loading.gif";
  }

  switch (variant) {
    case "xs":
      return <Image height={24} width={24} src={loaderGif} alt="loading" />;

    case "small":
      return <Image height={30} width={30} src={loaderGif} alt="loading" />;
    case "medium":
      return <Image height={60} width={60} src={loaderGif} alt="loading" />;
    case "large":
      return <Image height={80} width={80} src={loaderGif} alt="loading" />;
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
