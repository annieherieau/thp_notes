import React, { useState } from "react";
import { Layout, Button } from "antd";
import MarkdownInput from "./components/MarkdownInput";
import NoteDisplay from "./components/NoteDisplay";
import { useEffect } from "react";
import NotePreview from "./components/NotePreview";
const { Content, Footer, Sider } = Layout;

const App = () => {
  // LOCALSTORAGE
  const emptyNote = () => {
    return { key: Date.now(), title: "", content: "" };
  };
  const [storageKeys, setStorageKeys] = useState(
    Object.keys(localStorage) ? Object.keys(localStorage) : []
  );
  const [savedNotes, setSavedNotes] = useState(getNotes());
  const [currentNote, setCurrentNote] = useState(emptyNote());
  const [title, setTitle] = useState(currentNote.title);
  const [content, setContent] = useState(currentNote.content);

  useEffect(() => {
    setSavedNotes(getNotes());
  }, [storageKeys]);

  useEffect(() => {
    if (currentNote) {
      setCurrentNote({ ...currentNote, title, content });
    }
  }, [title, content]);

  useEffect(() => {
    setTitle(currentNote.title);
    setContent(currentNote.content);
  }, [currentNote]);

  const saveNote = () => {
    localStorage.setItem(
      currentNote.key,
      JSON.stringify({
        key: currentNote.key,
        title: currentNote.title,
        content: currentNote.content,
      })
    );
    updateStorage();
  };

  const updateStorage = () => {
    setStorageKeys(Object.keys(localStorage));
    setSavedNotes(getNotes());
  };
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
    setCurrentNote(emptyNote());
    localStorage.removeItem(key);
    updateStorage();
  };

  const clearStorage = () => {
    localStorage.clear();
    updateStorage();
    
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider className="menu">
        <div className="logo" />

        <Button
          className="add-note"
          onClick={() => setCurrentNote(emptyNote())}
          type="primary"
        >
          Nouvelle Note
        </Button>
        <p>Notes Sauvegardées : {storageKeys.length}</p>
        {savedNotes.map((note) => (
          <NotePreview
            note={note}
            key={note.key}
            onClick={() => setCurrentNote(selectedNote(note.key))}
            onDelete={() => {
              deleteNote(note.key);
            }}
          />
        ))}

        <Button danger className="clear-storage" onClick={clearStorage}>Effacter Tout</Button>
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
