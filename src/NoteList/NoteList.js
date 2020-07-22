import React from 'react';
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'
import AddNote from '../AddNote/AddNote'

export default class NoteList extends React.Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      displayAddFolder: false
    }
  }
  static contextType = NotefulContext;

  handleAddNote = () => {
    this.setState({
      displayAddNote: true
    })
  }

  resetAddNoteState = () => {
    this.setState({
      displayAddNote: false
    })
  }

  renderCreateNewNoteButton() {
    return (
      <button onClick={this.handleAddNote}>Add Note</button>
    )
  }

  renderNewNoteForm() {
    let folderIdentity = "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1";
    if (this.props.match.params.folderId) {
      folderIdentity = this.props.match.params.folderId
    };
    return (
      <AddNote
        key={folderIdentity}
        active={this.state.displayAddNote}
        folderId={folderIdentity}
        resetFunction={this.resetAddNoteState}
      />
    )
  }

  render() {
    const { notes } = this.context;
    let noteList = [];

    if (this.props.match.params.folderId) {
      noteList = notes
        .filter(note => note.folder_id == this.props.match.params.folderId)
        .map(note => {
          return <Note
            key={note.id}
            history={this.props.history}
            id={note.id}
            name={note.note_name}
            dateMod={note.date_created}
          />
        })
    } else {
      noteList = notes.map(note => {
        return <Note
          key={note.id}
          history={this.props.history}
          id={note.id}
          name={note.note_name}
          dateMod={note.date_created}
        />
      })
    }


    return (
      <div>
        {this.state.displayAddNote && this.renderNewNoteForm()}
        {!this.state.displayAddNote && this.renderCreateNewNoteButton()}
        <ul>
          {noteList}
        </ul>
      </div>
    )
  }
}