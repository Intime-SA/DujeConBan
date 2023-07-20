import React from "react";
import Header from "./Header";
import Productos from "./Productos";
import Pedidos from "./Pedidos";

function Home() {
  return (
    <>
      <Header />
      <div
        style={{
          marginLeft: "150px",
          marginBottom: "150px",
          marginTop: "100px",
          width: "1500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <Pedidos />
    </>
  );
}

export default Home;
