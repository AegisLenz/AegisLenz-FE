import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import AI from "./page/AI";
import Iam from "./page/Iam";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AI" element={<AI />} />
        <Route path="/IAM" element={<Iam />} />
      </Routes>
    </Router>
  );
}

export default App;
