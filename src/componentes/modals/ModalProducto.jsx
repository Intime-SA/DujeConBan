import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Description } from "@mui/icons-material";
import axios from "axios";

function ModalProducto({ open, handleClose, setCargado }) {
  let initialValues = {
    name: "",
    description: "",
    img: "",
    precio: "",
  };

  const onSubmit = (data) => {
    let arg = {
      name: data.name,
      description: data.description,
      img: data.img,
      precio: data.precio,
      stock: false,
    };

    axios
      .post("http://localhost:5000/productos", arg)
      .then((res) => {
        handleClose();
        setCargado(true);
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

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
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
              height: "400px",
            }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6" color="primary">
              Agregar Producto
            </Typography>
            <TextField
              id="outlined-basic"
              label="Nombre Producto"
              variant="outlined"
              name="name"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              name="description"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Url Imagen"
              variant="outlined"
              name="img"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              name="precio"
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

export default ModalProducto;
