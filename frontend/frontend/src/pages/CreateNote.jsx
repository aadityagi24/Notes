import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateNote() {
  const [title, setTitle] = useState(""); 
  const navigate = useNavigate(); //  redirecting to note page


  async function handleCreateNote() {
    if (title.trim() === "") {
      toast.error("Please enter a title");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/notes", {
        title: title,
        content: ""
      });

      toast.success("Note created successfully");
      const noteId = response.data._id;
      navigate(`/note/${noteId}`);
    } catch (error) {
      console.log(error);
      toast.error("Could not create note");
    }
  }

  return (
    <div className="create-note">
      <div className="create-note-box">
        <h2>Create a New Note</h2>

        <form
          className="note-form"
          onSubmit={(e) => {
            e.preventDefault(); 
            handleCreateNote();
          }}
        >
          <input
            type="text"
            className="note-input"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="submit" className="note-button">
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
}
