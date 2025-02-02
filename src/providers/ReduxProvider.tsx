"use client";
import store from "@/app/store";
import React, { JSX } from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
