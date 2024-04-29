import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mounts from "./Pages/Mounts";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="mounts" element={<Mounts/>}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
