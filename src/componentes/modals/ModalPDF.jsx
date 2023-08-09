import React, { useEffect, useState } from "react";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Button } from "@mui/material";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  table: {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    top: 0,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#000000",
    padding: 5,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: "15px",
  },
  tableCell: {
    paddingLeft: "5px",
    paddingRight: "0px",
    textAlign: "right",
  },
  container: {
    display: "flex",
    paddingBottom: "250px",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "100px",
    margin: "15px",
    top: "0",
  },

  textColum1: {
    fontFamily: "Helvetica",
    fontSize: 20,
    color: "#89ca8f",
    margin: "10px",
    textAlign: "left",
  },

  textColum2: {
    fontFamily: "Helvetica",
    fontSize: 20,
    color: "#89ca8f",
    margin: "10px",
    textAlign: "left",
  },

  textColum3: {
    fontFamily: "Helvetica",
    fontSize: 25,
    color: "#89ca8f",
    margin: "10px",
    textAlign: "right",
  },

  textBlack: {
    color: "black",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "100px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  columnFlex2: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "25px",
  },
  spaceAround: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "10px",
  },
  endJustify: {
    display: "flex",
    justifyContent: "flex-end",
  },
  infoBlock: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginRight: 10,
  },
  infoText: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const ModalPDF = ({ data }) => {
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
    <Document>
      <Page size="A4">
        <View
          style={{
            paddingBottom: "250px",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-around",
            }}
          >
            <View style={styles.infoBlock}>
              <Text style={styles.infoText}>CUIT: 30-71576888-3</Text>
              <Text style={styles.infoText}>
                Dirección: Av. Dr. Arturo Alió 3198, B7600 Mar del Plata,
                Provincia de Buenos Aires
              </Text>
              <Text style={styles.infoText}>Teléfono: 0223 680-0402</Text>
            </View>
            <View>
              <Image
                src="https://scontent.fmdq6-1.fna.fbcdn.net/v/t39.30808-6/277579593_660204662063497_2104655870613909459_n.jpg?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u37a-wjdn5sAX84wc0f&_nc_ht=scontent.fmdq6-1.fna&oh=00_AfD4xaLiYI34bd_nNeJjbofCsJMMif3Uy-TnCyjj5R0cWw&oe=64D4D412"
                alt="logiyo"
                style={styles.image}
              />
            </View>
          </View>
          <View style={styles.header}>
            <View style={styles.columnFlex2}>
              <Text>Pedido ID:</Text>
              <Text style={styles.textColum1}>
                {data ? data.id : "no cargo la info"}
              </Text>
              <Text>Nombre Cliente</Text>
              <Text style={styles.textColum2}>
                {data ? data.cliente : "no cargo la info"}
              </Text>
              <Text style={{ marginTop: "40px" }}>Fecha de Entrega: </Text>
              <Text style={styles.textColum2}>
                {data ? data.fecha : "no cargo la info"}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableHeader, flex: 2 }}>Producto</Text>
              <Text
                style={{ ...styles.tableCell, ...styles.tableHeader, flex: 1 }}
              >
                Precio
              </Text>
              <Text
                style={{ ...styles.tableCell, ...styles.tableHeader, flex: 1 }}
              >
                Unidades
              </Text>
              <Text
                style={{ ...styles.tableCell, ...styles.tableHeader, flex: 1 }}
              >
                Totales
              </Text>
            </View>
            {data.productos.map((producto, index) => (
              <View key={producto.id} style={styles.tableRow}>
                <View style={{ ...styles.tableCell, flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      textAlign: "left",
                      fontSize: "10px",
                    }}
                  >
                    {producto[0].Producto[0]}
                  </Text>
                </View>
                <View
                  style={{ ...styles.tableCell, flex: 1, fontSize: "10px" }}
                >
                  <Text style={{ color: "black" }}>
                    {parseFloat(producto[0].Producto[1]).toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{ ...styles.tableCell, flex: 1, fontSize: "10px" }}
                >
                  <Text style={{ color: "black" }}>{producto[1].Cantidad}</Text>
                </View>
                <View style={{ ...styles.tableCell, flex: 1 }}>
                  <Text style={{ color: "black" }}>
                    ${" "}
                    {parseFloat(
                      producto[1].Cantidad * producto[0].Producto[1]
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.endJustify}>
            <Text style={styles.textColum3}>
              Total Orden: $ {parseFloat(totalPrice).toFixed(2)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ModalPDF;
