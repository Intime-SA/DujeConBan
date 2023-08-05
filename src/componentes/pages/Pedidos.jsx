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
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import _, { forEach } from "lodash";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const pedidosInvertidos = pedidos.slice().reverse();
  const [cambioEstado, setCambioEstado] = useState(false);
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [pedido, setPedido] = useState();

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/pedidosVendedores").then((res) => {
        setPedidos(res.data);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }, [cambioEstado]);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    container: {
      flex: 1,
      margin: 32,
      padding: 32,
      border: "1 solid #000",
    },
    row: {
      flexDirection: "row",
      borderBottom: "1 solid #000",
      alignItems: "center",
      height: 32,
    },
    cell: {
      flex: 1,
      textAlign: "center",
    },
  });

  function convertirObjetoAPdf(dataObject) {
    const doc = new jsPDF();

    // Constantes para estilos y posicionamiento
    const tamañoFuenteTitulo = 40;
    const tamañoFuenteEncabezado = 20;
    const tamañoFuenteNormal = 12;
    const fuenteNegrita = "helvetica";
    const fuenteNormal = "helvetica";
    const posiciónInicioTabla = 150;
    const x = 1000; // Coordenada X (horizontal) de la imagen en el PDF
    const y = 1000; // Coordenada Y (vertical) de la imagen en el PDF
    const ancho = 500; // Ancho de la imagen en el PDF
    const alto = 500; // Alto de la imagen en el PDF

    // Agregar la imagen al PD

    doc.setFontSize(tamañoFuenteTitulo);
    doc.setFont(fuenteNegrita, "bold");
    doc.setFont(fuenteNormal, "normal");

    doc.setFontSize(tamañoFuenteEncabezado);
    doc.setFont(fuenteNormal, "italic");

    doc.setFontSize(tamañoFuenteNormal);

    function quitarComillas(texto) {
      // Utilizamos una expresión regular para encontrar las comillas (simples o dobles) y reemplazarlas con una cadena vacía
      // También eliminamos los espacios innecesarios
      return texto.replace(/['{}"]/g, "");
    }

    const columnas = ["Listado", "Unidad"];

    function recorrerArray(objet) {
      for (let i = 0; i < objet.length; i++) {
        const element = objet[i];
        return element;
      }
    }

    function agregarArray(arr, obj1, obj2) {
      arr.push(obj1);
      arr.push(obj2);
      console.log(arr);
    }

    let prod;
    let cant;

    const newArray = [];

    const datosTabla = dataObject.map((item) => {
      prod = recorrerArray(item[0]);
      cant = recorrerArray(item[1]);
      agregarArray(newArray, prod, cant);
      return [
        quitarComillas(JSON.stringify(item[0])),
        quitarComillas(JSON.stringify(item[1])),
      ];
    });

    // Configuración de las columnas utilizando objetos

    doc.autoTable({
      startY: posiciónInicioTabla,
      head: [columnas],
      body: datosTabla,
      styles: {
        fillColor: [128, 206, 214], // Color de fondo (en este caso, azul)
        fontSize: 10, // Tamaño de fuente
        fontStyle: "bold", // Estilo de fuente (negrita)
      },
    });
    var imageUrl =
      "https://scontent.fmdq6-1.fna.fbcdn.net/v/t39.30808-6/277579593_660204662063497_2104655870613909459_n.jpg?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u37a-wjdn5sAX84wc0f&_nc_ht=scontent.fmdq6-1.fna&oh=00_AfCOVdQDN5BGotqcMTZeY7NQ1nNO3eMt6fZkPStCh5dQ5A&oe=64D2D9D2";

    // Agrega la imagen al PDF
    doc.addImage(imageUrl, "JPEG", 10, 10, 100, 100); // (imagen, formato, x, y, ancho, alto)

    // Guarda o muestra el PDF (esto muestra el PDF en una nueva ventana del navegador)
    doc.output("dataurlnewwindow");
    doc.save(`${pedido}-.pdf`);
  }

  const descargarJson = async (element) => {
    try {
      const res = await axios
        .get(`http://localhost:5000/pedidosVendedores/${element.id}`)
        .then((res) => {
          console.log(res.data.productos);
          setData(res.data.productos);
          convertirObjetoAPdf(data);
          setPedido(res.data.id);
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
