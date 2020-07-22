import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import format from 'date-fns/format'
import PropTypes from 'prop-types'

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  static defaultProps = {
    onDeleteNote: () => { },

  }
  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    this.props.history.push('/');
    this.context.deleteNote(noteId);
  }

  render() {
    const modified = this.props.dateMod
    return (
      <li
        onClick={() => console.log(this.props.name)}
        className='note-container'>
        <Link to={`/note/${this.props.id}`}>
          <div>
            <h3>{this.props.name}</h3>
          </div>
        </Link>
        <section>
          <p>Last Modified: {format(new Date(modified), 'MM/dd/yyyy')}</p>
        </section>
        <div>
          <button
            type="button"
            onClick={this.handleClickDelete}
          >
            Delete
          </button>
        </div>
      </li>
    )
  }
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  dateMod: PropTypes.string.isRequired
}