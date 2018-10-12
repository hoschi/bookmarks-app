# Bookmarks App

-   optimistic UI for "mark as read/unread"
    -   updates UI before server responded
    -   also the problem with this approach shows easily when you mark the top item as read: the list doesn't reorder itself! This is because the sort logic is only in the backend/server, not in frontend.
