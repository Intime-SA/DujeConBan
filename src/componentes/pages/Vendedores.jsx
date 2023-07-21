import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import ModalVendedor from "../modals/ModalVendedor";

function Vendedores() {
  const [dataVendedor, setDataVendedor] = useState([]);
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
    axios.get("http://localhost:5000/vendedores").then((res) => {
      setDataVendedor(res.data);
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
              </tr>
            </thead>
            <tbody>
              {dataVendedor.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>{dato.telefono}</td>
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
