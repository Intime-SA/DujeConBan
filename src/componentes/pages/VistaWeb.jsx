import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const VistaWeb = ({ data }) => {
  return (
    <div style={{ paddingBottom: "250px" }}>
      <img
        src="https://scontent.fmdq6-1.fna.fbcdn.net/v/t39.30808-6/277579593_660204662063497_2104655870613909459_n.jpg?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u37a-wjdn5sAX84wc0f&_nc_ht=scontent.fmdq6-1.fna&oh=00_AfD4xaLiYI34bd_nNeJjbofCsJMMif3Uy-TnCyjj5R0cWw&oe=64D4D412"
        alt="logiyo"
        style={{ width: "250px" }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "end",
          flexDirection: "column",
        }}
      >
        Pedido ID: <h3>{data ? data.id : "no cargo la info"}</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "black" }}>
          {data ? data.cliente : "no cargo la info"}
        </h1>
        <h1 style={{ color: "black" }}>
          {data ? data.fecha : "no cargo la info"}
        </h1>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>Productos del Pedido</h3>
        <h3>Precio</h3>
        <h3>Unidades</h3>
      </div>
      {data.productos.map((producto, index) => (
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          key={index}
        >
          <h2 style={{ color: "black" }}>{producto[0].Producto[0]}</h2>{" "}
          <h2 style={{ color: "black" }}>Precio $ {producto[0].Producto[1]}</h2>{" "}
          <h2 style={{ color: "black" }}>{producto[1].Cantidad}</h2>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <h3>Total Compra</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained">Descargar PDF</Button>
      </div>
    </div>
  );
};

export default VistaWeb;
