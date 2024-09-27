import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mylist" element={<Home />} />

        <Route path="/login" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}