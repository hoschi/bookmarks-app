import { gql } from './__generated__/gql'

// NOTICE: backend would assign the id, but fake server doesn't support this.
// We use "time" as ID to "make sure" we get not colliding IDs.
export const getNewBookmarkId = () => new Date().getTime().toString()

// NOTICE: items should be sorted by two levels: isRead, dateCreated.
// Because this is not possible with fake server, dateCreated was left out
// entirely.
export const queryAllBookmarks = gql(/* GraphQL */ `
    query AllBookmarks {
        allBookmarks(sortField: "isRead", sortOrder: "ASC") {
            id
            title
            url
            isRead
        }
    }
`)

export const createBookmark = gql(/* GraphQL */ `
    mutation CreateBookmark($title: String!, $url: String!) {
        createBookmark(isRead: false, title: $title, url: $url) {
            id
        }
    }
`)

export const changeBookmarkReadFlag = gql(/* GraphQL */ `
    mutation ChangeReadFlag($id: ID!, $isRead: Boolean!) {
        updateBookmark(id: $id, isRead: $isRead) {
            id
            isRead
        }
    }
`)

export const removeBookmark = gql(/* GraphQL */ `
    mutation RemoveBookmark($id: ID!) {
        removeBookmark(id: $id) {
            id
        }
    }
`)
