import React, { Children } from "react";
import CardProducto from "./CardProducto";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Modal, Typography } from "@mui/material";
import Marcas from "./Marcas";

function ProductoListado({
  botonStock,
  botonEliminar,
  cerrarListadoProductos,
}) {
  const [resultadoProductos, setResultadoProductos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/productos").then((res) => {
      setResultadoProductos(res.data);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "2rem",
      }}
    >
      <h2 style={{ margin: "1rem", fontSize: "2rem" }}>Productos</h2>
      <Button variant="contained" disableElevation>
        Agregar Producto
      </Button>
      <Marcas botonStock={botonStock} botonEliminar={botonEliminar} />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {resultadoProductos.map((elemento) => (
            <CardProducto
              elemento={elemento}
              botonStock={botonStock}
              botonEliminar={botonEliminar}
            />
          ))}
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
        </div>
      </Box>
    </div>
  );
}

export default ProductoListado;
