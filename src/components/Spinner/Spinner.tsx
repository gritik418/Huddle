import Image from "next/image";
import React, { JSX } from "react";

const Spinner = (): JSX.Element => {
  return (
    <Image height={40} width={40} src={"/images/loading.gif"} alt="loading" />
  );
};

export default Spinner;
