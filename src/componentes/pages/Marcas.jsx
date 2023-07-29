import React, { useState } from "react";
import axios from "axios";
import CardProducto from "./CardProducto";
import { Button, TextField } from "@mui/material";

const Marcas = (botonStock, botonEliminar, cerrarListadoProductos) => {
  const [marca, setMarca] = useState("");
  const [productos, setProductos] = useState([]);

  const handleInputChange = (event) => {
    setMarca(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5000/productos?marca=${marca}`
      );
      setProductos(response.data);
    } catch (error) {
      console.error(error);
      setProductos([]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          width: "500px",
          margin: "1rem",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Marca"
          variant="standard"
          type="text"
          id="marca"
          name="marca"
          value={marca}
          onChange={handleInputChange}
          required
        />
        <Button
          style={{ marginTop: "0.5rem" }}
          type="submit"
          variant="outlined"
        >
          Buscar
        </Button>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          backgroundColor: "#D1E7D3",
        }}
      >
        {productos.map((elemento) => (
          <CardProducto
            elemento={elemento}
            botonStock={botonStock}
            botonEliminar={botonEliminar}
          />
        ))}
      </div>
    </div>
  );
};

export default Marcas;
