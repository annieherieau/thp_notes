import React, { useState } from "react";
import { Layout, theme, Button } from "antd";
import MarkdownInput from "./components/MarkdownInput";
import NoteDisplay from "./components/NoteDisplay";
import { useEffect } from "react";
import NotePreview from "./components/NotePreview";
const { Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // LOCALSTORAGE
  const [storageKeys, setStorageKeys] = useState(
    Object.keys(localStorage) ? Object.keys(localStorage) : []
  );
  const [savedNotes, setSavedNotes] = useState(getNotes());
  const [currentNote, setCurrentNote] = useState(selectedNote());

  const [title, setTitle] = useState(currentNote ? currentNote.title : "");
  const [content, setContent] = useState(currentNote ? currentNote.content : "");

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

  useEffect(() => {
    setSavedNotes(getNotes());
  }, [storageKeys]);

  function addNote() {
    const key = Date.now();
    const note = { key, title: "", content: "" };
    localStorage.setItem(key, JSON.stringify(note));
    setStorageKeys(Object.keys(localStorage));
    setCurrentNote({ note });
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

  useEffect(() => {
    if (currentNote){
      setCurrentNote({ ...currentNote.note, title, content });
    } 
  }, [title, content]);

  useEffect(() =>{
    setSavedNotes(getNotes())
  }, [currentNote])

  const saveNote = () => {
    localStorage.setItem(
      currentNote.key,
      JSON.stringify({ title: currentNote.title, content: currentNote.content })
    );
    setSavedNotes(getNotes());
  };

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
            margin: "0 16px",
          }}
        >
          {currentNote && <NoteDisplay note={currentNote} />}

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
