import React, { useState } from "react";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { Button } from "@mui/material";

const ModalPDF = ({ data }) => {
  cambio;
  return (
    <Document>
      <Page size="A4">
        <View style={{ paddingBottom: "250px" }}>
          <Image
            src="https://scontent.fmdq6-1.fna.fbcdn.net/v/t39.30808-6/277579593_660204662063497_2104655870613909459_n.jpg?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u37a-wjdn5sAX84wc0f&_nc_ht=scontent.fmdq6-1.fna&oh=00_AfD4xaLiYI34bd_nNeJjbofCsJMMif3Uy-TnCyjj5R0cWw&oe=64D4D412"
            alt="logiyo"
            style={{ width: "250px" }}
          />
          <View
            style={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
            }}
          >
            Pedido ID: <Text>{data ? data.id : "no cargo la info"}</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={{ color: "black" }}>
              {data ? data.cliente : "no cargo la info"}
            </Text>
            <Text style={{ color: "black" }}>
              {data ? data.fecha : "no cargo la info"}
            </Text>
          </View>
          <View style={{ display: "flex", justifyContent: "space-around" }}>
            <Text>Productos del Pedido</Text>
            <Text>Precio</Text>
            <Text>Unidades</Text>
          </View>
          {data.productos.map((producto, index) => (
            <View
              style={{ display: "flex", justifyContent: "space-around" }}
              key={index}
            >
              <Text style={{ color: "black" }}>{producto[0].Producto[0]}</Text>{" "}
              <Text style={{ color: "black" }}>
                Precio $ {producto[0].Producto[1]}
              </Text>{" "}
              <Text style={{ color: "black" }}>{producto[1].Cantidad}</Text>
            </View>
          ))}
          <View style={{ display: "flex", justifyContent: "end" }}>
            <Text>Total Compra</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained">Descargar PDF</Button>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ModalPDF;
