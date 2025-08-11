import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Personnel from "./Components/Personnel";
import AddPersonnel from "./Components/AddPersonnel";
import EditPersonnel from "./Components/EditPersonnel";
import Job from "./Components/Job";
import AddJob from "./Components/AddJob";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/personnel" element={<Personnel />}></Route>
          <Route path="/dashboard/job" element={<Job />}></Route>
          <Route path="/dashboard/add_job" element={<AddJob />}></Route>
          <Route
            path="/dashboard/add_personnel"
            element={<AddPersonnel />}
          ></Route>
          <Route
            path="/dashboard/edit_personnel/:id"
            element={<EditPersonnel />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
