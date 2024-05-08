
import showdown from "showdown";

export default function NoteDisplay({ note }) {
  if (note) {
    const converter = new showdown.Converter();
    const createMarkup = ()=> {
      return {__html: converter.makeHtml(note.content)};
    }
    return (
      <div className="NoteDisplay">
        <h1 className="note-title'">{note.title}</h1>
        <div className='note-content' dangerouslySetInnerHTML={createMarkup()}></div>
      </div>
    );
  }
}
