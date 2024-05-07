export default function NotePreview({ note, onClick}) {
  const content = note.content.split(" ").slice(0, 14).join(" ");
  return (
    <div className="NotePreview" onClick={onClick}>
      <h6 className="title-preview">{note.title}</h6>
      <div className="content-preview">{content}</div>
    </div>
  );
}
