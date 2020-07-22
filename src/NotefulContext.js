import React from 'react'

const BookmarksContext = React.createContext({
  folders: [],
  notes: [],
  // addFolder: () => { },
  // addNote: () => { },
  deleteNote: () => { },
})

export default BookmarksContext
