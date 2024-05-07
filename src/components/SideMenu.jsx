import { Button } from "antd";
import NotePreview from "./NotePreview";

export default function SideMenu({ notes }) {
  
  return (
    <nav className="SideMenu">
      <Button className="AddNote" onClick={() => newNote()} type="primary">
        Nouvelle Note
      </Button>
      <p>{notes && notes.length}</p>
      {notes &&
        notes.length > 0 &&
        notes.map((noteData) => (
          <NotePreview note={noteData.note} key={noteData.key} />
        ))}
    </nav>
  );
}
