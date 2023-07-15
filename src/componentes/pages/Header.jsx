import React from "react";

function Header() {
  return (
    <div
      className="header1"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "antiquewhite",
        height: "15vw",
      }}
    >
      <h1>Bienvenidos a Distribuidora MDP</h1>
      <h2>La mejor opcion, al mejor precio</h2>
    </div>
  );
}

export default Header;
