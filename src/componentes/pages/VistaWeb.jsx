import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalPDF from "../modals/ModalPDF";
import { PDFDownloadLink, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const VistaWeb = ({ data }) => {
  const [descarga, setDescarga] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate the total price when data changes
    let totalPrice = 0;
    data.productos.forEach((producto) => {
      const price = producto[1].Cantidad * producto[0].Producto[1];
      totalPrice += price;
    });
    setTotalPrice(totalPrice);
  }, [data]);

  return (
    <div style={{ paddingBottom: "250px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src="https://scontent.fmdq6-1.fna.fbcdn.net/v/t39.30808-6/277579593_660204662063497_2104655870613909459_n.jpg?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u37a-wjdn5sAX84wc0f&_nc_ht=scontent.fmdq6-1.fna&oh=00_AfD4xaLiYI34bd_nNeJjbofCsJMMif3Uy-TnCyjj5R0cWw&oe=64D4D412"
          alt="logiyo"
          style={{ width: "250px" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "end",
            flexDirection: "column",
          }}
        >
          <h4>CUIT: 30-71576888-3</h4>
          <h4>
            Dirección: Av. Dr. Arturo Alió 3198, B7600 Mar del Plata, Provincia
            de Buenos Aires
          </h4>
          <h4>Teléfono: 0223 680-0402</h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          flexDirection: "column",
        }}
      >
        Pedido ID: <h3>{data ? data.id : "no cargo la info"}</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "black" }}>
          {data ? data.cliente : "no cargo la info"}
        </h1>
        <h1 style={{ color: "black" }}>
          {data ? data.fecha : "no cargo la info"}
        </h1>
      </div>
      <br />
      <br />

      <table style={{ width: "90vw" }} className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Unidades</th>
            <th>Totales</th>
          </tr>
        </thead>
        <tbody>
          {data.productos.map((producto, index) => (
            <tr key={producto.id}>
              <td>
                <h2 style={{ color: "black" }}>{producto[0].Producto[0]}</h2>{" "}
              </td>
              <td>
                <h2 style={{ color: "black" }}>
                  {parseFloat(producto[0].Producto[1]).toFixed(2)}
                </h2>{" "}
              </td>
              <td>
                <h2 style={{ color: "black" }}>{producto[1].Cantidad}</h2>{" "}
              </td>
              <td>
                <h2 style={{ color: "black" }}>
                  ${" "}
                  {parseFloat(
                    producto[1].Cantidad * producto[0].Producto[1]
                  ).toFixed(2)}
                </h2>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <h2>Total Orden: $ {parseFloat(totalPrice).toFixed(2)}</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained">Descargar PDF</Button>
      </div>
    </div>
  );
};

export default VistaWeb;
