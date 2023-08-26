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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import "./pedidos.css";
import { Modal, ModalManager, Alert, Fab } from "@mui/material";
import { Margin } from "@mui/icons-material";
import ModalJson from "../modals/ModalJson";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import jsPDF from "jspdf";
import "jspdf-autotable";
import confetti from "canvas-confetti";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import { PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";
import ModalPDF from "../modals/ModalPDF";
import VistaWeb from "./VistaWeb";
import EditIcon from "@mui/icons-material/Edit";
import { useGlobalState } from "../components/Context"; // Importa el hook

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const pedidosInvertidos = pedidos.slice().reverse();
  const [cambioEstado, setCambioEstado] = useState(false);
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [idCliente, setIdCliente] = useState("");

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/pedidosVendedores").then((res) => {
        setPedidos(res.data);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }, [cambioEstado]);

  const descargarJson = async (element) => {
    try {
      const res = await axios
        .get(`http://localhost:5000/pedidosVendedores/${element.id}`)
        .then((res) => {
          console.log(res.data.productos);
          setData(res.data);
          setRender(true);
          window.scrollTo({ top: 300, behavior: "smooth" });
        });

      // Llamar a convertObjectToPdf después de que se haya completado la petición
    } catch (error) {
      console.error("Error al obtener datos JSON:", error);
    }
  };

  const color = (estado) => {
    let entregado = "success";
    let pendiente = "secondary";

    if (estado) {
      return entregado;
    } else {
      return pendiente;
    }
  };

  const botonActivo = (elemento) => {
    axios
      .patch(`http://localhost:5000/pedidosVendedores/${elemento.id}`, {
        estado: !elemento.estado,
      })
      .then((res) => {
        setCambioEstado(true);
      });

    setCambioEstado(false);
  };

  function Estado(prop) {
    if (prop === true) {
      return (
        <Alert variant="filled" severity="success">
          Entregado
        </Alert>
      );
    } else {
      return (
        <Alert
          style={{ display: "flex", justifyContent: "center" }}
          variant="filled"
          severity="info"
        >
          Pendiente
        </Alert>
      );
    }
  }

  let linkWsp = ``;

  async function envioMensaje(nombre, id) {
    console.log(nombre[0]);
    try {
      const clientesResponse = await axios.get(
        `http://localhost:5000/clientes`
      );
      const clienteEncontrado = clientesResponse.data.find(
        (cliente) => cliente.name === nombre[0]
      );

      if (!clienteEncontrado) {
        console.log(`Cliente con nombre ${nombre} no encontrado.`);
        return;
      }

      const idCliente = clienteEncontrado.id;
      const phoneNumberResponse = await axios.get(
        `http://localhost:5000/clientes/${idCliente}`
      );
      const phoneNumber = phoneNumberResponse.data.telefono;

      const message = `Te paso el detalle del pedido ID: ${id}`;
      const encodedMessage = encodeURIComponent(message);
      const linkWsp = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

      console.log(linkWsp);

      window.location.href = linkWsp;
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {render && <VistaWeb data={data} idCliente={idCliente} />}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th style={{ textAlign: "center" }}>Estado</th>
              <th style={{ textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosInvertidos.map((dato) => (
              <tr key={dato.id}>
                <td style={{ flex: 1 }}>{dato.id}</td>
                <td style={{ flex: 3, width: "25vw" }}>{dato.cliente}</td>
                <td style={{ flex: 1 }}>{dato.fecha}</td>
                <td style={{ textAlign: "center", flex: 2 }}>
                  {Estado(dato.estado)}
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25vw",
                    textAlign: "center",
                  }}
                >
                  <Fab size="small" color="secondary" aria-label="edit">
                    <EditIcon />
                  </Fab>
                  <button
                    style={{
                      background: "none",
                      border: "0px",
                      marginTop: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => envioMensaje(dato.cliente, dato.id)}
                  >
                    <img
                      style={{ width: "70px" }}
                      src="https://live.mrf.io/statics/i/ps/www.muycomputer.com/wp-content/uploads/2012/10/whatsapp.jpg?width=1200&enable=upscale"
                      alt="wsp"
                      id="wsp"
                    />
                  </button>
                  <Button
                    sx={{ margin: "1rem" }}
                    onClick={() => descargarJson(dato)}
                    variant="contained"
                    color={color(dato.estado)}
                  >
                    Detalle{" "}
                    <span class="material-symbols-outlined">search</span>
                  </Button>
                  <ToggleButton
                    value="check"
                    onClick={() => botonActivo(dato)}
                    selected={selected}
                    onChange={() => {
                      setSelected(!selected);
                    }}
                  >
                    <CheckIcon />
                  </ToggleButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

export default Pedidos;
