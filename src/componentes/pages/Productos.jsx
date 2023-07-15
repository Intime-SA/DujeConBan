import React from "react";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import CardProducto from "./CardProducto";
import axios, { AxiosHeaders } from "axios";
import confetti from "canvas-confetti";
import ModalProducto from "../modals/ModalProducto";
import ProductoListado from "./ProductoListado";

function Productos() {
  const [seleccion, setSeleccion] = useState(false);
  const [open, setOpen] = useState(false);
  const [abrir, setAbrir] = useState(false);
  const [listado, setListado] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [cargado, setCargado] = useState(false);
  const [eliminado, setEliminado] = useState(false);

  useEffect(() => {
    setSeleccion(false);
    setCargado(false);
    setEliminado(false);
    setListado(false);
  }, [seleccion, cargado, eliminado, listado]);

  const botonListadoProductos = () => setAbrir(true);
  const cerrarListadoProductos = () => setAbrir(false);

  const botonStock = (elemento) => {
    axios
      .patch(`http://localhost:5000/productos/${elemento.id}`, {
        stock: !elemento.stock,
      })
      .then((res) => setSeleccion(true));
    console.log(elemento.stock);

    if (elemento.stock !== true) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 0.5,
          y: 0,
        },
      });
    }
  };

  const botonEliminar = (elemento) => {
    axios
      .delete(`http://localhost:5000/productos/${elemento.id}`)
      .then((res) => setEliminado(true));
    console.log(elemento.id);
  };

  return (
    <>
      <div
        className="agregarPelicula"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Button onClick={handleOpen}>Agregar Producto</Button>
        <Button onClick={botonListadoProductos}>Ver Productos</Button>

        <Button>Ver pedidos</Button>
        <Button>Reportes</Button>
        <br />
        <Button>Vendedores</Button>
        <Button>Clientes</Button>
        <ModalProducto
          open={open}
          handleClose={handleClose}
          setCargado={setCargado}
        />
      </div>
      <ProductoListado
        abrir={abrir}
        botonEliminar={botonEliminar}
        botonStock={botonStock}
        setListado={setListado}
        cerrarListadoProductos={cerrarListadoProductos}
      />
    </>
  );
}
export default Productos;
