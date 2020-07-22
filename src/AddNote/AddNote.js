import React, { Component } from "react";
import NotefulContext from "../NotefulContext.js";
import PropTypes from 'prop-types'
//import './AddNote.css';

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.bodyInput = React.createRef();
    this.folderIdInput = React.createRef();
  }

  static contextType = NotefulContext;

  handleSubmit(event) {
    event.preventDefault();
    this.props.resetFunction();
    this.context.post({
      note_name: this.nameInput.current.value,
      folder_id: this.folderIdInput.current.value,
      content: this.bodyInput.current.value
    }, "notes");
  }

  mapFolders = () => {
    const folders = this.context.folders.map((folder, idx) => {
      return (
        <option key={idx} value={folder.id}>{folder.folder_name}</option>
      )
    })
    return folders;
  }

  render() {
    if (this.props.active) {
      return (
        <form className="add-note note-form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="add-note">Add Note</label>
          <input name="note-name" id="note-name" type="text" ref={this.nameInput} placeholder={'Note Name'} required></input>
          <input name="note-body" id="note-body" type="text" ref={this.bodyInput} placeholder={'Note Content'} required></input>
          <label htmlFor="select-folder">Choose a folder</label>
          <select id="select-folder" name="select-folder" ref={this.folderIdInput}>
            {this.mapFolders()}
          </select>
          <input type="submit" value="Submit" id="add-note-submit" />
          {/* after we update the list and click submit we should set state in folderList back to false */}
        </form>
      );
    }
    return <></>
  };
}

AddNote.propTypes = {
  active: PropTypes.bool.isRequired,
  folderId: PropTypes.string.isRequired,
  resetFunction: PropTypes.func.isRequired
}