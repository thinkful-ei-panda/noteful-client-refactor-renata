import React from 'react';
import Folder from '../Folder/Folder'
import NotefulContext from '../NotefulContext'
import AddFolder from '../AddFolder/AddFolder'

export default class FolderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAddFolder: false
    }
  }
  static contextType = NotefulContext;

  handleAddFolder = () => {
    this.setState({
      displayAddFolder: true
    })
  }

  resetAddFolderState = () => {
    this.setState({
      displayAddFolder: false
    })
  }

  renderCreateNewFolderButton() {
    return (
      <button onClick={this.handleAddFolder}>Add Folder</button>
    )
  }

  renderNewFolderForm() {
    return (
      <AddFolder
        active={this.state.displayAddFolder}
        resetFunction={this.resetAddFolderState}
      />
    )
  }

  render() {
    const { folders } = this.context;
    let folderList = [];

    if (this.props.match.params.folderId) {
      folderList = folders.find(folder => folder.id == this.props.match.params.folderId)
      folderList = <Folder
        key={folderList.id}
        id={folderList.id}
        name={folderList.folder_name} />
    } else {
      folderList = folders.map(folder => {
        return <Folder
          key={folder.id}
          id={folder.id}
          name={folder.folder_name}
        />
      })
    }

    return (
      <div>
        <ul>
          {folderList}
        </ul>
        {this.state.displayAddFolder && this.renderNewFolderForm()}
        {!this.state.displayAddFolder && this.renderCreateNewFolderButton()}
      </div>
    )
  }

}