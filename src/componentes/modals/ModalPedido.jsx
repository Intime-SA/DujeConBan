import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PreVisualizadorPedido from "../pages/PreVisualizadorPedido";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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

  const eliminarProducto = (index) => {
    const updatedArray = [...selectedOptionsArray];
    updatedArray.splice(index, 1);
    setSelectedOptionsArray(updatedArray);
  };

  useEffect(() => {
    setNewItem([
      { Producto: producto },
      { Cantidad: cantidad },
      { Precio: opciones.precio },
      { Descuento: descuento },
    ]);
  }, [cantidad, producto, descuento]);

  const confirmarProducto = () => {
    setSelectedOptionsArray([...selectedOptionsArray, newItem]);
  };

  const handleChange3 = (event, value) => {
    if (value !== null) {
      setProducto(value);
      console.log(value);
      setSelectedOption3(value.precio);
    }
  };

  const handleChange4 = (event) => {
    const value = event.target.value;
    setCantidad(value);
  };
  const handleChange5 = (event) => {
    const value = event.target.value;
    setDescuento(value);
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

  const correctColumns = [
    { field: "id", width: 20 },
    { field: "Producto", width: 380 },
    { field: "Cantidad", width: 100 },
    { field: "Precio", width: 100 },
    { field: "Descuento", width: 100 },
    {
      field: "Acciones",
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => {
            eliminarProducto(params.id); // Aquí usamos params.id para obtener el id de la fila
          }}
        >
          <span className="material-symbols-outlined">delete</span>
        </Button>
      ),
    },
  ];

  const objeto = selectedOptionsArray.map((elemento, index) => ({
    id: index,
    Producto:
      elemento[0].Producto[0] +
      elemento[0].Producto[1] +
      elemento[0].Producto[2] +
      elemento[0].Producto[3] +
      elemento[0].Producto[4] +
      elemento[0].Producto[5],
    Cantidad: elemento[1].Cantidad,
    Precio: "$ " + elemento[0].Producto[7].toFixed(2),
    Descuento: elemento[3].Descuento + " %",
  }));
  console.log(objeto);

  const rows = objeto;

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
              <Button onClick={confirmarProducto}>
                <span
                  style={{
                    fontSize: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                  class="material-symbols-outlined"
                >
                  add
                </span>
              </Button>
            </ThemeProvider>
          </div>

          {/* {selectedOptionsArray.map((item, index) => ( 
            <ul key={index}>
              <li style={{ display: "flex", justifyContent: "space-between" }}>
                {item[0].Producto}..........{item[1].Cantidad}
              </li>
          </ul>)}*/}
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Box sx={{ height: 300 }}>
                <DataGrid rows={rows} columns={correctColumns} />
              </Box>
              {/* <table style={{ width: "90%" }} className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Unidades</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {selectedOptionsArray.map((item, index) => (
                  <tr key={index}>
                    <td style={{ width: "60%" }}>
                      <h4 style={{ color: "black", fontSize: "2rem" }}>
                        {item[0].Producto[0] +
                          item[0].Producto[1] +
                          item[0].Producto[2] +
                          item[0].Producto[3] +
                          item[0].Producto[4] +
                          item[0].Producto[5]}
                      </h4>{" "}
                    </td>
                    <td style={{ width: "10%" }}>
                      <h4 style={{ color: "black", fontSize: "2rem" }}>
                        {parseFloat(item[0].Producto[7]).toFixed(2)}
                      </h4>{" "}
                    </td>
                    <td style={{ width: "10%" }}>
                      <h4 style={{ color: "black", fontSize: "2rem" }}>
                        {item[1].Cantidad}
                      </h4>{" "}
                    </td>
                    <td style={{ width: "10%" }}>
                      <Button onClick={() => eliminarProducto(index)}>
                        <span class="material-symbols-outlined">delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            </Grid>
          </Grid>

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
