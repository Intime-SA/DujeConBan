import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Text } from "@react-pdf/renderer";
import "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  const [selectedOptionsArray, setSelectedOptionsArray] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [newItem, setNewItem] = useState();
  const [producto, setProducto] = useState();

  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          option: {
            fontFamily: "Arial, sans-serif", // Cambia la fuente de las opciones
            // Otras propiedades de estilo que quieras ajustar
          },
        },
      },
    },
  });

  // Función que se pasará como prop al componente hijo
  const onSubmit = (data) => {
    // Formatear la fecha en el formato "yyyy-MM-dd"
    const fechaIsoObj = new Date(data.fecha);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const fechaSimpleStr = fechaIsoObj.toLocaleDateString(options);

    axios
      .post("http://localhost:5000/pedidosVendedores", {
        cliente: selectedOption,
        fecha: fechaSimpleStr,
        productos: selectedOptionsArray,
      })
      .then((res) => {
        console.log(res.data);
        botonCerrarPedido();
        setAbrirPedidos(true);
      });
  };

  const confirmarProducto = () => {
    setSelectedOptionsArray([...selectedOptionsArray, newItem]);
  };

  const handleChange3 = (event, value) => {
    if (value !== null) {
      setProducto(value);
      console.log(value);
      setSelectedOption3(value.precio);
    }
    setCantidad(0);
  };

  const handleChange4 = (event) => {
    const value = event.target.value;
    setCantidad(value);
  };
  const handleChange5 = (event) => {
    const value = event.target.value;
    setDescuento(value);
    setNewItem([
      { Producto: producto },
      { Cantidad: cantidad },
      { Precio: opciones.precio },
      { Descuento: descuento },
    ]);
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
    setOptions(dataClientes.map((cliente) => [cliente.name]));
  }, [dataClientes]);

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
    const filteredOptions = opciones.filter(
      (propiety) => propiety.stock === true
    );
    setOptions2(
      filteredOptions.map((propiedad) => {
        return [
          propiedad.marca,
          "-",
          propiedad.name,
          " ",
          propiedad.peso,
          propiedad.medida,
          " $",
          propiedad.precio,
        ];
      })
    );
  }, [dataProductos]);

  function quitarComas(objt) {
    const objeto = objt.replace(/,/g, "");
    return objeto;
  }

  const opciones = dataProductos.map((producto) => {
    return {
      name: producto.name,
      precio: producto.precio,
      stock: producto.stock,
      marca: producto.marca,
      peso: producto.peso,
      medida: producto.medida,
    };
  });

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
            height: "80vh",
          }}
          onSubmit={handleSubmit}
        >
          <h3 style={{ fontSize: "3rem" }}>Crear Pedido</h3>
          <div sx={{ display: "flex" }}>
            <DemoContainer
              sx={{ display: "flex", alignItems: "center", margin: "0.5rem" }}
              components={["DatePicker"]}
            >
              <div>
                Fecha de Entrega:
                <DatePicker
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0.5rem",
                  }}
                  id="fecha"
                  name="fecha"
                  value={selectedOption2}
                  onChange={handleChange2}
                />
              </div>
              <div>
                Seleccionar Comercio:
                <Autocomplete
                  disablePortal
                  id="cliente"
                  options={options}
                  name="cliente"
                  value={selectedOption}
                  onChange={handleChange}
                  sx={{ width: 300, margin: "0.5rem" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Escribe el Comercio" />
                  )}
                />
              </div>
            </DemoContainer>
          </div>
          <div style={{ width: "100%" }}>
            <h3 style={{ fontSize: "2rem", textAlign: "left" }}>
              Seleccionar Productos
            </h3>
            <ThemeProvider theme={theme}>
              <Autocomplete
                disablePortal
                id="productos"
                options={options2}
                name="productos"
                value={selectedOption3}
                onChange={handleChange3}
                fullWidth
                renderInput={(params) => {
                  quitarComas(params.inputProps.value);

                  return <TextField {...params} label="Escribe el Producto" />;
                }}
              />
              <TextField
                sx={{ width: 300, margin: "1rem" }}
                disablePortal
                id="cantidad"
                name="cantidad"
                value={cantidad} // Asignamos el valor del estado aquí
                onChange={handleChange4}
                label="Cantidad de Unidades"
              />

              <TextField
                sx={{ width: 300, margin: "1rem" }}
                disablePortal
                id="cantidad"
                name="descuento"
                value={descuento} // Asignamos el valor del estado aquí
                onChange={handleChange5}
                label="Descuento %"
              />
              <Button onClick={confirmarProducto}>Agregar</Button>
            </ThemeProvider>
          </div>

          {/* {selectedOptionsArray.map((item, index) => ( 
            <ul key={index}>
              <li style={{ display: "flex", justifyContent: "space-between" }}>
                {item[0].Producto}..........{item[1].Cantidad}
              </li>
          </ul>)}*/}

          <table style={{ width: "30vw" }} className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Unidades</th>
              </tr>
            </thead>
            <tbody>
              {selectedOptionsArray.map((item, index) => (
                <tr key={index}>
                  <td>
                    <h4 style={{ color: "black" }}>
                      {item[0].Producto[0] +
                        item[0].Producto[1] +
                        item[0].Producto[2] +
                        item[0].Producto[3] +
                        item[0].Producto[4] +
                        item[0].Producto[5]}
                    </h4>{" "}
                  </td>
                  <td>
                    <h4 style={{ color: "black" }}>
                      {parseFloat(item[0].Producto[7]).toFixed(2)}
                    </h4>{" "}
                  </td>
                  <td>
                    <h4 style={{ color: "black" }}>{item[1].Cantidad}</h4>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
