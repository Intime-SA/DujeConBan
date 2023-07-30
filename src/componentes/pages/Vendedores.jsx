import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Box, Button } from "@mui/material";
import ModalVendedor from "../modals/ModalVendedor";
import confetti from "canvas-confetti";

function Vendedores({
  setAbrirVendedores,
  cerrarListadoVendedores,
  botonVendedores,
}) {
  const [dataVendedor, setDataVendedor] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [carga, setCarga] = useState(false);
  const vendedorInvertidos = dataVendedor.slice().reverse();

  const botonAbrirModal = () => {
    setAbrirModal(true);
  };

  const botonCerrarModal = () => {
    setAbrirModal(false);
  };

  const botonActivo = (elemento) => {
    axios
      .patch(`http://localhost:5000/vendedores/${elemento.id}`, {
        estado: !elemento.estado,
      })
      .then((res) => {
        setAbrirVendedores(true);
      });

    setAbrirVendedores(false);

    if (elemento.estado !== true) {
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

  const Estado = (prop) => {
    if (prop === true) {
      return (
        <Alert variant="filled" severity="success">
          Activo
        </Alert>
      );
    } else {
      return (
        <Alert variant="filled" severity="error">
          Inactivo
        </Alert>
      );
    }
  };

  const close = () => setAbrirModal(false);

  useEffect(() => {
    axios.get("http://localhost:5000/vendedores").then((res) => {
      setDataVendedor(res.data);
    });
  }, []);

  useEffect(() => {
    setCarga(false);
  }, [carga]);

  botonVendedores();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ margin: "1rem", fontSize: "2rem" }}>Vendedores</h2>
      <Button variant="contained" disableElevation onClick={botonAbrirModal}>
        Agregar Vendedores
      </Button>
      <ModalVendedor
        abrirModal={abrirModal}
        botonCerrarModal={botonCerrarModal}
        setCarga={setCarga}
        close={close}
        setAbrirVendedores={setAbrirVendedores}
      />
      <div>
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
                <th>Telefono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vendedorInvertidos.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>{dato.telefono}</td>
                  <td>{Estado(dato.estado)}</td>
                  <td>
                    <Button
                      sx={{ marginLeft: "2rem" }}
                      onClick={() => botonActivo(dato)}
                      variant="outlined"
                      color="success"
                    >
                      Cambiar Estado
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </div>
    </div>
  );
}

export default Vendedores;
