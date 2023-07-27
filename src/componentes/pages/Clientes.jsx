import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import ModalVendedor from "../modals/ModalVendedor";
import ModalCliente from "../modals/ModalCliente";

function Clientes() {
  const [dataCliente, setDataCliente] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [carga, setCarga] = useState(false);

  const botonAbrirModal = () => {
    setAbrirModal(true);
  };

  const botonCerrarModal = () => {
    setAbrirModal(false);
  };

  const close = () => setAbrirModal(false);

  useEffect(() => {
    axios.get("http://localhost:5000/clientes").then((res) => {
      setDataCliente(res.data);
    });
  }, [carga]);

  useEffect(() => {
    setCarga(false);
  }, [carga]);

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
      <h2 style={{ margin: "1rem", fontSize: "2rem" }}>Clientes Directos</h2>
      <Button variant="contained" disableElevation onClick={botonAbrirModal}>
        Agregar Cliente
      </Button>
      <ModalCliente
        abrirModal={abrirModal}
        botonCerrarModal={botonCerrarModal}
        close={close}
        setCarga={setCarga}
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
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Dia</th>
                <th>Zona</th>
              </tr>
            </thead>
            <tbody>
              {dataCliente.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.name}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.direccion}</td>
                  <td>{dato.dia}</td>
                  <td>{dato.zona}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </div>
    </div>
  );
}

export default Clientes;
