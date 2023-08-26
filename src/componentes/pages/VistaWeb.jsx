import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalPDF from "../modals/ModalPDF";
import { PDFDownloadLink, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import { useGlobalState } from "../components/Context"; // Importa el hook
import axios from "axios";

const VistaWeb = ({ data, idCliente }) => {
  const [descarga, setDescarga] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [abrir, setAbrir] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(""); // Estado para almacenar la URL

  const { globalState } = useGlobalState();

  const idPedido = "pedidoID:" + data.id + ".pdf";

  console.log(idCliente);
  useEffect(() => {
    // Calculate the total price when data changes
    let totalPrice = 0;
    data.productos.forEach((producto) => {
      const price = producto[1].Cantidad * producto[0].Producto[7];
      totalPrice += price;
    });
    setTotalPrice(totalPrice);
  }, [data]);

  let linkWsp = ``;

  async function envioMensaje(id) {
    let phoneNumber;

    await axios.get(`http://localhost:5000/clientes/${id}`).then((res) => {
      phoneNumber = res.data.telefono;
      console.log(res.data.telefono);
    });

    const message = `Te paso el detalle del pedido ID: ${id}`; // Mensaje a enviar
    linkWsp = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    console.log(linkWsp);

    return (window.location.href = linkWsp);
  }

  return (
    <div style={{ paddingBottom: "250px" }}>
      {/* <PDFViewer>{abrir && <ModalPDF data={data} />}</PDFViewer> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src="https://media.licdn.com/dms/image/D4D0BAQEvYBgs5V2lhQ/company-logo_200_200/0/1682360728459?e=1697673600&v=beta&t=Im6s7_Cy12RU4pKxagWyRxKi8NEG9AELc4eBDNBWCQY"
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
          <PDFDownloadLink
            style={{ marginTop: "10px" }}
            document={<ModalPDF data={data} />}
            fileName={idPedido}
          >
            {({ blob, url, loading, error }) => (
              <Button variant="contained">
                {loading ? "Generando PDF..." : "Descargar PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <button
            style={{
              background: "none",
              border: "0px",
              marginTop: "6px",
              cursor: "pointer",
            }}
            onClick={() => envioMensaje(idCliente)}
          >
            <img
              style={{ width: "70px" }}
              src="https://live.mrf.io/statics/i/ps/www.muycomputer.com/wp-content/uploads/2012/10/whatsapp.jpg?width=1200&enable=upscale"
              alt="wsp"
              id="wsp"
            />
          </button>
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
                <h2 style={{ color: "black" }}>
                  {producto[0].Producto[0] +
                    " " +
                    producto[0].Producto[2] +
                    " " +
                    producto[0].Producto[4] +
                    producto[0].Producto[5]}
                </h2>{" "}
              </td>
              <td>
                <h2 style={{ color: "black" }}>
                  {parseFloat(producto[0].Producto[7]).toFixed(2)}
                </h2>{" "}
              </td>
              <td>
                <h2 style={{ color: "black" }}>{producto[1].Cantidad}</h2>{" "}
              </td>
              <td>
                <h2 style={{ color: "black" }}>
                  ${" "}
                  {parseFloat(
                    producto[1].Cantidad * producto[0].Producto[7]
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
      <div style={{ display: "flex", justifyContent: "start" }}>
        <PDFDownloadLink
          document={<ModalPDF data={data} />}
          fileName={idPedido}
        >
          {({ blob, url, loading, error }) => (
            <Button variant="contained">
              {loading ? "Generando PDF..." : "Descargar PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default VistaWeb;
