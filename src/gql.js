import { gql } from 'graphql.macro'

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
            isRead
        }
    }
`
