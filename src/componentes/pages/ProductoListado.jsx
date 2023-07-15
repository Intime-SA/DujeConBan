import React from "react";
import CardProducto from "./CardProducto";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Modal, Typography } from "@mui/material";

function ProductoListado({
  abrir,
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
    <Modal
      open={abrir}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          color="white"
          textAlign="center"
          backgroundColor="black"
          padding={{ padding: "50px" }}
        >
          Productos
        </Typography>
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
          >
            <Button
              onClick={cerrarListadoProductos}
              variant="contained"
              color="primary"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ProductoListado;
