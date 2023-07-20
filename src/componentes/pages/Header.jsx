import React from "react";
import Productos from "./Productos";

function Header() {
  return (
    <div
      className="header1"
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px",
        margin: "opx",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          height: "300px",
        }}
      >
        <img
          src="https://media.licdn.com/dms/image/D4D0BAQEvYBgs5V2lhQ/company-logo_200_200/0/1682360728459?e=1697673600&v=beta&t=Im6s7_Cy12RU4pKxagWyRxKi8NEG9AELc4eBDNBWCQY"
          alt="logo"
        />
      </div>
      <Productos />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          height: "300px",
        }}
      >
        <span
          style={{
            fontSize: "3rem",
          }}
          class="material-symbols-outlined"
        >
          account_balance install_desktop manage_accounts
        </span>
      </div>
    </div>
  );
}

export default Header;
