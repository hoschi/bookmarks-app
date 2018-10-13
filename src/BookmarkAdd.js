import React from 'react'
import { Mutation } from 'react-apollo'
import BookmarAddForm from './BookmarAddForm'
import { createBookmark, queryAllBookmarks } from './gql'

function BookmarkAdd() {
    return (
        <Mutation
            mutation={createBookmark}
            ignoreResults
            refetchQueries={[{ query: queryAllBookmarks }]}
        >
            {(createBookmark) => {
                return <BookmarAddForm createBookmark={createBookmark} />
            }}
        </Mutation>
    )
}

export default BookmarkAdd
