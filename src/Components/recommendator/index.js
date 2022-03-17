import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function Recommendator(recommended) {
  return (
    <>
      {recommended.data.map((el) => (
        <p>{el.name} </p>
      ))}
    </>
  );
}

export default Recommendator;
