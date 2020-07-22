import React from 'react';
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'

export default class FolderList extends React.Component {
  static contextType = NotefulContext;

  render() {
    const notes = this.context.notes;
    let noteObj = notes.find(note => note.id == this.props.match.params.noteId);

    let note = <Note
      key={noteObj.id}
      id={noteObj.id}
      history={this.props.history}
      name={noteObj.note_name}
      dateMod={noteObj.date_created}
    />

    return (
      <div>
        <section>
          {note}
          <p>{noteObj.content}</p>
        </section>
      </div>
    )
  }
}