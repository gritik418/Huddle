import Image from "next/image";
import { JSX } from "react";

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
      return (
        <Image
          height={24}
          width={24}
          unoptimized
          priority
          src={loaderGif}
          alt="loading"
        />
      );

    case "small":
      return (
        <Image
          height={30}
          width={30}
          unoptimized
          priority
          src={loaderGif}
          alt="loading"
        />
      );
    case "medium":
      return (
        <Image
          height={60}
          width={60}
          unoptimized
          priority
          src={loaderGif}
          alt="loading"
        />
      );
    case "large":
      return (
        <Image
          height={80}
          width={80}
          priority
          unoptimized
          src={loaderGif}
          alt="loading"
        />
      );
    default:
      return (
        <Image
          height={20}
          width={20}
          priority
          unoptimized
          src={"/images/loader.gif"}
          alt="loading"
        />
      );
  }
};

export default Spinner;
