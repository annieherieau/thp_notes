export default function NotePreview({ note, onClick }) {
  const content = note.content.split(" ").slice(0, 14).join(" ");
  const title = note.title ? note.title : '[nouvelle note]';
  return (
    <div className="NotePreview" onClick={onClick}>
      <div className="title-preview">{title}</div>
      <div className="content-preview">{content}</div>
    </div>
  );
}
