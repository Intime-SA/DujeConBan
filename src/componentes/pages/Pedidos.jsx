import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import axios from "axios";
import "./pedidos.css";
import { Modal, Button, ModalManager, Alert } from "@mui/material";
import { Margin } from "@mui/icons-material";

function Pedidos(abrirPedidos) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/pedidosVendedores").then((res) => {
        setPedidos(res.data);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }, []);

  const Estado = (prop) => {
    if (prop === 2400) {
      return (
        <Alert variant="filled" severity="success">
          Entregado
        </Alert>
      );
    } else {
      return (
        <Alert variant="filled" severity="info">
          Pendiente
        </Alert>
      );
    }
  };

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
      <h2 style={{ margin: "1rem", fontSize: "2rem" }}>Pedidos</h2>
      <Button variant="contained" disableElevation>
        Crear Pedido
      </Button>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.name}</td>
                <td>{dato.precio}</td>
                <td>{Estado(dato.precio)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}
export default Pedidos;
