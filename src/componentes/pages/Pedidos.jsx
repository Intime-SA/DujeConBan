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
import { Modal, Button, ModalManager } from "@mui/material";
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

  return (
    <div
      style={{
        display: "flex",
        top: "20px",
        width: "80vw",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "10vw",
        flexDirection: "column",
      }}
    >
      Pedidos
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
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.name}</td>
                <td>{dato.precio}</td>
                <td>{dato.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}
export default Pedidos;
