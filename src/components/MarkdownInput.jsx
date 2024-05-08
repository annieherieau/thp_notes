import { Button, Input } from "antd";

export default function MarkdownInput({ note, onChange, onClick, onDelete }) {
  return (
    <div className="MarkdownInput">
      <label htmlFor="input-title">Titre</label>
      <Input
        id="input-title"
        name="input-title"
        onChange={onChange}
        value={note.title}
        placeholder="[nouvelle note : titre]"
      />
      <label htmlFor="input-content">Contenu</label>
      <Input.TextArea
        id="input-content"
        name="input-content"
        onChange={onChange}
        value={note.content}
        placeholder="[nouvelle note: contenu]"
        autoSize={{
          minRows: 10,
          maxRows: 20,
        }}
      >
        {note.content}
      </Input.TextArea>
      <div className="form-btns">
        <Button type="primary" onClick={onClick}>
          Sauvegarder
        </Button>
        <Button type="" onClick={onDelete}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}
