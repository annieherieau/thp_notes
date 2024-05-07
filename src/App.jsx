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
  const [currentNote, setCurrentNote] = useState(
    selectedNote(storageKeys[storageKeys.length - 1])
  );
  function selectedNote(key) {
    if (storageKeys.length > 0) {
      const note = JSON.parse(localStorage.getItem(key));
      note.key = key;
      return { note };
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

  const addNote = () => {
    const key = Date.now();
    const note = { key, title: "mon titre", content: "test note!" };
    localStorage.setItem(key, JSON.stringify(note));
    setStorageKeys(Object.keys(localStorage));
    setCurrentNote({ note });
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
        {savedNotes.map((noteData) => (
          <NotePreview
            note={noteData.note}
            key={noteData.note.key}
            onClick={() => setCurrentNote(selectedNote(noteData.note.key))}
          />
        ))}
        <Button onClick={() => localStorage.clear()}>Effacter Tout</Button>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <p color="white">Notes Sauvegardées : {storageKeys.length}</p>
          {currentNote && <NoteDisplay note={currentNote.note} />}

          {currentNote && <MarkdownInput note={currentNote.note} />}
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
