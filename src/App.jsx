import React, { useState } from "react";
import { Layout, Button } from "antd";
import MarkdownInput from "./components/MarkdownInput";
import NoteDisplay from "./components/NoteDisplay";
import { useEffect } from "react";
import NotePreview from "./components/NotePreview";
const { Content, Footer, Sider } = Layout;

const App = () => {
  // LOCALSTORAGE
  const [storageKeys, setStorageKeys] = useState(
    Object.keys(localStorage) ? Object.keys(localStorage) : []
  );
  const [savedNotes, setSavedNotes] = useState(getNotes());
  const [currentNote, setCurrentNote] = useState({
    key: Date.now(),
    title: "",
    content: "",
  });
  const [title, setTitle] = useState(currentNote.title);
  const [content, setContent] = useState(currentNote.content);

  useEffect(() => {
    setSavedNotes(getNotes());
  }, [storageKeys]);

  useEffect(() => {
    if (currentNote) {
      setCurrentNote({ ...currentNote.note, title, content });
    }
  }, [title, content]);

  useEffect(() => {
    setSavedNotes(getNotes());
    setTitle(currentNote.title);
    setContent(currentNote.content);
  }, [currentNote]);

  const saveNote = () => {
    localStorage.setItem(
      currentNote.key,
      JSON.stringify({ title: currentNote.title, content: currentNote.content })
    );
    setSavedNotes(getNotes());
  };

  function addNote() {
    setCurrentNote({ key: Date.now(), title: "", content: "" });
    localStorage.setItem(currentNote.key, JSON.stringify(currentNote));
    setStorageKeys(Object.keys(localStorage));
  }

  const updateNote = (event) => {
    let label = event.target.id.split("-").pop();
    if (label === "title") {
      setTitle(event.target.value);
    }

    if (label === "content") {
      setContent(event.target.value);
    }
  };

  function selectedNote(key = storageKeys[storageKeys.length - 1]) {
    if (storageKeys.length > 0) {
      const note = JSON.parse(localStorage.getItem(key));
      return { key, title: note.title, content: note.content };
    } else {
      return null;
    }
  }

  function getNotes() {
    let notes_array = [];
    if (storageKeys.length > 0) {
      notes_array = storageKeys.map((key) => {
        return selectedNote(key);
      });
    }
    return notes_array;
  }

  const deleteNote = (key) => {
    localStorage.removeItem(key);
    setCurrentNote(selectedNote());
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider className="menu">
        <div className="logo" />

        <Button className="addNote" onClick={() => addNote()} type="primary">
          Nouvelle Note
        </Button>
        {savedNotes.map((note) => (
          <NotePreview
            note={note}
            key={note.key}
            onClick={() => setCurrentNote(selectedNote(note.key))}
          />
        ))}
        <p>Notes Sauvegardées : {storageKeys.length}</p>
        <Button onClick={() => localStorage.clear()}>Effacter Tout</Button>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: ".75rem 2rem",
          }}
        >
          {currentNote && <NoteDisplay note={currentNote} />}
          <hr></hr>
          {currentNote && (
            <MarkdownInput
              note={currentNote}
              onChange={updateNote}
              onClick={saveNote}
              onDelete={() => {
                deleteNote(currentNote.key);
              }}
            />
          )}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Annie Hérieau ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
