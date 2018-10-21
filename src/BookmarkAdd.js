import React from 'react'
import { Mutation } from 'react-apollo'
import BookmarkAddForm from './BookmarkAddForm'
import { createBookmark, queryAllBookmarks } from './gql'

function BookmarkAdd() {
    return (
        <Mutation
            mutation={createBookmark}
            ignoreResults
            refetchQueries={[{ query: queryAllBookmarks }]}
        >
            {(createBookmark) => {
                return <BookmarkAddForm createBookmark={createBookmark} />
            }}
        </Mutation>
    )
}

export default BookmarkAdd
