import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" Component={Home} />
      <Route path="/add-user" Component={AddUser} />
    </Routes>
  );
}

export default App;
