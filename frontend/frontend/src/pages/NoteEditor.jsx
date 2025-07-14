import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

export default function NoteEditor() {
  const { id } = useParams();

  const [note, setNote] = useState({
    title: "",
    content: "",
    updatedAt: "",
  });

  const [userCount, setUserCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState("Saved");

  const timer = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    // Connect to server
    socket.current = io("http://localhost:5000");

    // Get note from server
    axios.get(`http://localhost:5000/notes/${id}`).then((res) => {
      setNote(res.data);
    });

    // Join the note room
    socket.current.emit("join_note", id);

    // when someone changes the note
    socket.current.on("note_update", (newContent) => {
      setNote((oldNote) => {
        return { ...oldNote, content: newContent };
      });
    });

    // Show number of active users
    socket.current.on("active_users", (count) => {
      setUserCount(count);
    });

    // When user leaves the page
    return () => {
      socket.current.disconnect();
    };
  }, [id]);

  function handleTextChange(e) {
    const newText = e.target.value;

    setNote((oldNote) => {
      return { ...oldNote, content: newText };
    });

    setSaveStatus("Saving...");

    // Send to others using socket
    socket.current.emit("note_update", {
      noteId: id,
      content: newText,
    });

    
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      axios.put(`http://localhost:5000/notes/${id}`, {
        content: newText,
      });
      setSaveStatus("Saved");
    }, 5000);
  }

  return (
    <div className="note-editor">
      <div className="note-header">
        <h2>{note.title ? note.title : "Untitled Note"}</h2>

        <div className="note-info">
          <p>👥 Users: {userCount}</p>
          <p>💾 Status: {saveStatus}</p>
          <p>⏰ Last Updated: {note.updatedAt ? new Date(note.updatedAt).toLocaleTimeString() : "—"}</p>
        </div>
      </div>

      <TextareaAutosize
        className="note-textarea"
        minRows={10}
        placeholder="Start typing your note..."
        value={note.content}
        onChange={handleTextChange}
      />
    </div>
  );
}
