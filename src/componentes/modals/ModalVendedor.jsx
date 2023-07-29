import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Description } from "@mui/icons-material";
import axios from "axios";

function ModalVendedor({
  abrirModal,
  botonCerrarModal,
  setCarga,
  close,
  setAbrirVendedores,
}) {
  let initialValues = {
    name: "",
    telefono: "",
    estado: true,
  };

  const onSubmit = (data) => {
    let arg = {
      name: data.name,
      telefono: data.telefono,
      estado: true,
    };

    axios
      .post("http://localhost:5000/vendedores", arg)
      .then((res) => {
        setCarga(true);
        close();
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const { handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  setAbrirVendedores(true);

  return (
    <>
      <Modal
        open={abrirModal}
        onClose={botonCerrarModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              alignItems: "space-around",
              height: "400px",
            }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6" color="primary">
              Agregar Vendedor
            </Typography>
            <TextField
              id="outlined-basic"
              label="Nombre Vendedor"
              variant="outlined"
              name="name"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Telefono"
              variant="outlined"
              name="telefono"
              fullWidth
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Agregar
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default ModalVendedor;
