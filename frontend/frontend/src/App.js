import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateNote from "./pages/CreateNote";
import NoteEditor from "./pages/NoteEditor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <Router>
      
      <ToastContainer position="top-center" autoClose={1000} />
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
