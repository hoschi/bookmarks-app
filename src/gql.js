import gql from 'graphql-tag'

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

export const changeBookmarkReadFlag = gql`
    mutation ChangeReadFlag($id: ID!, $isRead: Boolean!) {
        updateBookmark(id: $id, isRead: $isRead) {
            id
            title
            isRead
        }
    }
`
