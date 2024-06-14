import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser.jsx";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" Component={Home} />
      <Route path="/add-user" Component={AddUser} />
      <Route path="/edit-user/:id" Component={EditUser} />
    </Routes>
  );
}

export default App;
