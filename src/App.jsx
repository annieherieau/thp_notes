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
  const getNotes = () => {
    if (storageKeys.length > 0) {
      storageKeys.map((key) => {
        const note = JSON.parse(localStorage.getItem(key));
        return { key, note };
      });
    } else {
      return [];
    }
  };
  const [savedNotes, setSavedNotes] = useState(getNotes());
  const lastSavedNote = () => {
    if (storageKeys.length > 0) {
      const key = storageKeys[storageKeys.length - 1];
      const note = JSON.parse(localStorage.getItem(key));
      return { key, note };
    } else {
      return [];
    }
  };
  const [currentNote, setCurrentNote] = useState(lastSavedNote());

  useEffect(() => {
    setSavedNotes(getNotes());
  }, [storageKeys]);

  const addNote = () => {
    const key = Date.now();
    const note = { title: key, content: "2" };
    localStorage.setItem(key, JSON.stringify(note));
    setStorageKeys(Object.keys(localStorage));
    setCurrentNote({ key, note });
  };

  console.log(currentNote);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider>
        <div className="logo" />

        <Button className="addNote" onClick={() => addNote()} type="primary">
          Nouvelle Note
        </Button>
        {/* {savedNotes.map((noteData) => (
            <NotePreview note={noteData.note} key={noteData.key} />
          ))} */}
        <Button onClick={() => localStorage.clear()}>Effacter Tout</Button>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <p color="white">Notes Sauvegardées : {storageKeys.length}</p>
          <NoteDisplay note={currentNote.note} key= {currentNote.key} />
          <MarkdownInput note={currentNote.note} key= {currentNote.key} />
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
