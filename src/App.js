import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componentes/pages/Home";
import Archivos from "./componentes/pages/Archivos";
import { GlobalStateProvider } from "./componentes/components/Context"; // Importa tu contexto

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archivos" element={<Archivos />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
