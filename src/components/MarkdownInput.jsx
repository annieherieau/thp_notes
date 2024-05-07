import { Button, Input } from "antd";

export default function MarkdownInput({ note, onChange, onClick, onDelete }) {

 

  return (
    <div className="MarkdownInput">
        <label htmlFor="input-title"></label>
        <Input
          id="input-title"
          name="input-title"
          onChange={onChange}
          value={note.title}
        />
        <label htmlFor="input-contenu"></label>
        <Input.TextArea
          id="input-content"
          name="input-contenu"
          onChange={onChange}
          value={note.content}
        >
          {note.content}
        </Input.TextArea>

        <Button type="primary" onClick={onClick}>
          Sauvegarder
        </Button>
        <Button type="" onClick={onDelete}>
          Supprimer
        </Button>
    </div>
  );
}
