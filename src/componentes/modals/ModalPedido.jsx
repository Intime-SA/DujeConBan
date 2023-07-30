import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function ModalPedido({
  crearPedido,
  botonCerrarPedido,
  setAbrirPedidos,
  cerrarListadoPedidos,
}) {
  const [dataClientes, setDataClientes] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState();
  const [dataProductos, setDataProductos] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState();

  // Función que se pasará como prop al componente hijo
  const onSubmit = (data) => {
    // Formatear la fecha en el formato "yyyy-MM-dd"
    const fechaIsoObj = new Date(data.fecha);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const fechaSimpleStr = fechaIsoObj.toLocaleDateString(options);

    axios
      .post("http://localhost:5000/pedidosVendedores", {
        cliente: data.cliente,
        fecha: fechaSimpleStr,
        productos: [selectedOption3],
      })
      .then((res) => {
        console.log(res.data);
        botonCerrarPedido();
        setAbrirPedidos(true);
      });
  };

  const handleChange2 = (value) => {
    console.log(value);
    setSelectedOption2(value);
  };
  const handleChange = (event, value) => {
    setSelectedOption(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption) {
      const data = {
        cliente: selectedOption,
        fecha: selectedOption2,
      };

      onSubmit(data);
    } else {
    }
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

  const handleChange3 = (event, value) => {
    setSelectedOption3(value);
    console.log(selectedOption3);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/productos")
      .then((res) => {
        setDataProductos(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filtrar los elementos que coinciden con el texto ingresado
  useEffect(() => {
    setOptions2(dataProductos.map((producto) => producto.name));
  }, [dataProductos]);

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
          <div sx={{ display: "flex", width: "2000px" }}>
            <Autocomplete
              disablePortal
              id="cliente"
              options={options}
              name="cliente"
              value={selectedOption}
              onChange={handleChange}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Escribe el Comercio" />
              )}
            />
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                id="fecha"
                name="fecha"
                value={selectedOption2}
                onChange={handleChange2}
              />
            </DemoContainer>
          </div>
          <Autocomplete
            disablePortal
            id="productos"
            options={options2}
            name="productos"
            value={selectedOption3}
            onChange={handleChange3}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Escribe el Producto" />
            )}
          />
          <Button
            onClick={cerrarListadoPedidos}
            type="submit"
            variant="contained"
            color="primary"
          >
            Agregar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalPedido;
