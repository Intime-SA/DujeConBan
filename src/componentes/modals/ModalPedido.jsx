import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import CalendarComponent from "../pages/CalendarComponent";

function ModalPedido({ crearPedido, botonCerrarPedido }) {
  const [dataClientes, setDataClientes] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/pedidosVendedores", {
        cliente: data.cliente,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event, value) => {
    setSelectedOption(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption) {
      const data = {
        cliente: selectedOption,
      };

      onSubmit(data);
    } else {
      // Aquí puedes mostrar algún mensaje de error o tomar alguna acción si el cliente no ha sido seleccionado.
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1000px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Llamada a la API usando useEffect para que se ejecute una vez al montar el componente
  useEffect(() => {
    axios
      .get("http://localhost:5000/clientes")
      .then((res) => {
        setDataClientes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filtrar los elementos que coinciden con el texto ingresado
  useEffect(() => {
    setOptions(dataClientes.map((cliente) => cliente.name));
  }, [dataClientes]);

  return (
    <Modal
      open={crearPedido}
      onClose={botonCerrarPedido}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",
            height: "600px",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" color="primary">
            Crear Pedido
          </Typography>
          <Autocomplete
            disablePortal
            id="cliente"
            options={options}
            name="cliente"
            value={selectedOption}
            onChange={handleChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Comercio" />}
          />
          <CalendarComponent name="fecha" />
          <Button type="submit" variant="contained" color="primary">
            Agregar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalPedido;
