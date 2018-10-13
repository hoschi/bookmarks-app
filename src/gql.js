import { gql } from 'graphql.macro'

// NOTICE: backend would assign the id, but fake server doesn't support this
let bookmarkId = 100
export const getNewBookmarkId = () => (bookmarkId++).toString()

export const queryAllBookmarks = gql`
    {
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
