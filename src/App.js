import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import AI from "./page/AI";
import Asset from "./page/Asset";
import Policy from "./page/Policy";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AI" element={<AI />} />
        <Route path="/Asset" element={<Asset />} />
        <Route path="/Policy" element={<Policy />} />
      </Routes>
    </Router>
  );
}

export default App;
