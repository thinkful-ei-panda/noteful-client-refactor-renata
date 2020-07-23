import React from 'react';
import { Route, Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import AppError from './AppError/AppError';
import FolderList from './FolderList/FolderList';
import NoteList from './NoteList/NoteList';
import FullNoteMain from './FullNoteMain/FullNoteMain';
import FullNoteSide from './FullNoteSide/FullNoteSide';
import './App.css';
import { API_KEY } from './config';
import BASE_URL from './config';
console.log(process.env.NODE_ENV);
console.log(BASE_URL);

//TO RUN Noteful JSON Server
//git clone https://github.com/tomatau/noteful-json-server
//cd ./noteful-json-server
//npm install
//npm start


//TO ADD THE DATE FORMAT
//npm install date-fns --save

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    };
  }

  handleDeleteNote = (noteId) => {
    console.log(noteId)
    fetch(`${BASE_URL}/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res;
      })
      .then(() => {
        this.sendGetRequest()
      })
      .catch(
        error => this.setState({ error })
      )
  };

  handleCreateFolder = (name) => {
    fetch(`${BASE_URL}/api/folders/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => this.sendGetRequest())
      .catch(
        error => this.setState({ error })
      );
  }

  handlePostRequest = (body, destination) => {
    fetch(`${BASE_URL}/api/${destination}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => this.sendGetRequest())
      .catch(
        error => this.setState({ error })
      );
  }

  componentDidMount() {
    this.sendGetRequest();
  }

  sendGetRequest() {
    Promise.all([
      fetch(`${BASE_URL}/api/notes`, {
        headers:
        {
          'Authorization': `Bearer ${API_KEY}`,
          'content-type': 'application/json',
        },

      }),
      fetch(`${BASE_URL}/api/folders`, {
        headers:
        {
          'Authorization': `Bearer ${API_KEY}`,
          'content-type': 'application/json',
        },
      })
    ])
    
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      // sets state for both notes and folders
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      // error catch all
      .catch(error => {
        console.error({ error });
      });
  }

  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      post: this.handlePostRequest
    };
    return (
      <NotefulContext.Provider value={value} >
        <div className='App'>
          <header>
            <Link to='/'>Noteful</Link>
          </header>
          <div className="flex-container">
            <AppError>
              <section className="column sidebar">
                <Route
                  exact
                  path="/"
                  component={FolderList} />
                <Route
                  path="/folder/:folderId"
                  component={FolderList} />
                <Route
                  path="/note/:noteId"
                  component={FullNoteSide} />
              </section>
            </AppError>
            <AppError>
              <main className="column">
                <Route exact
                  path="/"
                  component={NoteList} />
                <Route
                  path="/folder/:folderId"
                  component={NoteList} />
                <Route
                  path="/note/:noteId"
                  component={FullNoteMain} />
              </main>
            </AppError>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;