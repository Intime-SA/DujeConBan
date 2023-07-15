import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Switch,
} from "@mui/material";
import { ShoppingCartRounded } from "@mui/icons-material";
import axios from "axios";

function CardProducto({ elemento, botonStock, botonEliminar }) {
  return (
    <div>
      <Card sx={{ width: 350, margin: 5 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="350"
            image={elemento.img}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {elemento.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${elemento.precio}
            </Typography>
          </CardContent>
          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Stock"
                onClick={() => botonStock(elemento)}
              />
            </FormGroup>
            <Button onClick={() => botonEliminar(elemento)} variant="contained">
              Eliminar
            </Button>
          </div>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default CardProducto;
