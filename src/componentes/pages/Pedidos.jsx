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
import axios from "axios";
import "./pedidos.css";
import { Modal, ModalManager, Alert } from "@mui/material";
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
import styled from "@emotion/styled";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const pedidosInvertidos = pedidos.slice().reverse();
  const [cambioEstado, setCambioEstado] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/pedidosVendedores").then((res) => {
        setPedidos(res.data);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }, [cambioEstado]);

  function convertObjectToPdf(dataObject) {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text(`Productos del Pedido`, 105, 10, {
      align: "center",
    });

    const tableData = dataObject.map((item, index) => [
      index + 1,
      JSON.stringify(item),
    ]);
    doc.autoTable({
      startY: 20,
      head: [["#", "Datos"]],
      body: tableData,
    });

    doc.save("archivo.pdf");
  }

  const descargarJson = async (element) => {
    try {
      const res = await axios
        .get(`http://localhost:5000/pedidosVendedores/${element.id}`)
        .then((res) => {
          convertObjectToPdf(res.data.productos);
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
                <td>{dato.id}</td>
                <td>{dato.cliente}</td>
                <td>{dato.fecha}</td>
                <td style={{ textAlign: "center" }}>{Estado(dato.estado)}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "500px",
                    textAlign: "center",
                  }}
                >
                  {/* <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                      <div>
                        <Button
                          sx={{ margin: "1rem" }}
                          variant="contained"
                          {...bindToggle(popupState)}
                        >
                          Vista
                        </Button>
                        <Popper {...bindPopper(popupState)} transition>
                          {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                              <Paper>
                                <Typography sx={{ p: 2 }}>
                                  <h3>Productos del Pedido: {dataJson}</h3>
                                </Typography>
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                      </div>
                    )}
                  </PopupState> */}
                  <Button
                    sx={{ margin: "1rem" }}
                    onClick={() => descargarJson(dato)}
                    variant="contained"
                    color={color(dato.estado)}
                  >
                    Detalle
                    <span
                      style={{ marginLeft: "1rem" }}
                      id="export"
                      className="material-symbols-outlined"
                    >
                      system_update_alt
                    </span>
                  </Button>
                  <ToggleButton
                    value={selected}
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
