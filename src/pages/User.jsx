import React from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const { ids } = useParams();
  return (
    <>
      <p>User id is {ids}</p>
    </>
  );
}
