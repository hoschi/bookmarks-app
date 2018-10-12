# Bookmarks App

-   uses [graphql.macro](https://github.com/evenchange4/graphql.macro) to compile GraphQL text to JSON
    -   this moves some workload from users browser into compile time
-   optimistic UI for "mark as read/unread"
    -   updates UI before server responded
    -   also the problem with this approach shows easily when you mark the top item as read: the list doesn't reorder itself! This is because the sort logic is only in the backend/server, not in frontend.
