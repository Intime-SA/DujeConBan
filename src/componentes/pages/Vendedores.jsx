import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
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
      Vendedores
      <button onClick={botonAbrirModal}>Agregar Vendedores</button>
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
