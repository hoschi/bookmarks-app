import { gql } from 'graphql.macro'

// NOTICE: backend would assign the id, but fake server doesn't support this.
// We use "time" as ID to "make sure" we get not colliding IDs.
export const getNewBookmarkId = () => new Date().getTime().toString()

// NOTICE: items should be sorted by two levels: isRead, dateCreated.
// Because this is not possible with fake server, dateCreated was left out
// entirely.
export const queryAllBookmarks = gql`
    query AllBookmarks {
        allBookmarks(sortField: "isRead", sortOrder: "ASC") {
            id
            title
            url
            isRead
        }
    }
`

export const createBookmark = gql`
    mutation CreateBookmark($id: ID!, $title: String!, $url: String!) {
        createBookmark(id: $id, isRead: false, title: $title, url: $url) {
            id
        }
    }
`

export const changeBookmarkReadFlag = gql`
    mutation ChangeReadFlag($id: ID!, $isRead: Boolean!) {
        updateBookmark(id: $id, isRead: $isRead) {
            id
            isRead
        }
    }
`

export const removeBookmark = gql`
    mutation RemoveBookmark($id: ID!) {
        removeBookmark(id: $id)
    }
`
