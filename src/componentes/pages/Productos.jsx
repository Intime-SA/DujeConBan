import React from "react";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import CardProducto from "./CardProducto";
import axios, { AxiosHeaders } from "axios";
import confetti from "canvas-confetti";
import ModalProducto from "../modals/ModalProducto";
import ProductoListado from "./ProductoListado";
import Pedidos from "./Pedidos";
import Vendedores from "./Vendedores";
import Clientes from "./Clientes";
import "./productos.css";
import ModalPedido from "../modals/ModalPedido";

function Productos() {
  const [open, setOpen] = useState(false);
  const [abrir, setAbrir] = useState(false);
  const [abrirPedidos, setAbrirPedidos] = useState(false);
  const [abrirVendedores, setAbrirVendedores] = useState(false);
  const [abrirClientes, setAbrirClientes] = useState(false);
  const [crearPedido, setCrearPedido] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [seleccion, setSeleccion] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [eliminado, setEliminado] = useState(false);

  useEffect(() => {
    setSeleccion(false);
    setCargado(false);
    setEliminado(false);
  }, [seleccion, cargado, eliminado, abrir]);

  const botonCrearPedido = () => {
    setCrearPedido(true);
  };

  const botonCerrarPedido = () => {
    setCrearPedido(false);
  };

  const botonClientes = () => {
    setAbrirClientes(true);
    setAbrirPedidos(false);
    setAbrirVendedores(false);
    setAbrir(false);
  };

  const botonVendedores = () => {
    setAbrirVendedores(true);
    setAbrirClientes(false);
    setAbrirPedidos(false);
    setAbrir(false);
  };

  const botonListadoPedidos = () => {
    setAbrirPedidos(true);
    setAbrirClientes(false);
    setAbrirVendedores(false);
    setAbrir(false);
  };
  const cerrarListadoPedidos = () => setAbrirPedidos(false);

  const botonListadoProductos = () => {
    setAbrir(true);
    setAbrirPedidos(false);
    setAbrirClientes(false);
    setAbrirVendedores(false);
  };

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
    window.location.reload();
    console.log(elemento.id);
  };

  return (
    <>
      <div
        className="agregarPelicula"
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontSize: "3rem",
          width: "100vw",
          borderBottom: "solid black 1px",
        }}
      >
        <div>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            disableElevation
            size="large"
            onClick={handleOpen}
          >
            Agregar Producto
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="outlined"
            disableElevation
            size="large"
            onClick={botonCrearPedido}
          >
            Crear Pedido
          </Button>
        </div>
        <div>
          <Button style={{ margin: "10px" }} onClick={botonListadoProductos}>
            Ver Productos
          </Button>
          <Button style={{ margin: "10px" }} onClick={botonListadoPedidos}>
            Ver Pedidos
          </Button>
          <Button style={{ margin: "10px" }}>Reportes</Button>
          <Button style={{ margin: "10px" }} onClick={botonVendedores}>
            Vendedores
          </Button>
          <Button style={{ margin: "10px" }} onClick={botonClientes}>
            Clientes
          </Button>
        </div>
        <ModalProducto
          open={open}
          handleClose={handleClose}
          setCargado={setCargado}
        />
        <ModalPedido
          crearPedido={crearPedido}
          botonCerrarPedido={botonCerrarPedido}
        />
      </div>
      {abrir && (
        <ProductoListado
          abrir={abrir}
          botonEliminar={botonEliminar}
          botonStock={botonStock}
          cerrarListadoProductos={cerrarListadoProductos}
          setAbrir={setAbrir}
        />
      )}
      {abrirPedidos && <Pedidos abrirPedidos={abrirPedidos} />}
      {abrirVendedores && <Vendedores />}
      {abrirClientes && <Clientes abrirClientes={abrirClientes} />}
    </>
  );
}
export default Productos;
