let id = 1

function getId() {
    return id++
}

module.exports = {
    bookmarks: [
        {
            id: getId(),
            title: '🎼webpack 4: released today!!✨',
            url: 'https://medium.com/webpack/webpack-4-released-today-6cdb994702d4',
            isRead: false,
        },
        {
            id: getId(),
            title: 'mg979/vim-visual-multi: Multiple cursors project for vim/neovim (wip)',
            url: 'https://github.com/mg979/vim-visual-multi',
            isRead: false,
        },
        {
            id: getId(),
            title: 'Check out new Neovim UI build with JavaScript - Veonim',
            url: 'https://github.com/veonim/veonim',
            isRead: false,
        },
        {
            id: getId(),
            title: 'How To GraphQL - Mutations',
            url: 'https://www.howtographql.com/react-apollo/3-mutations-creating-links/',
            isRead: true,
        },
        {
            id: getId(),
            title: '🍾🚀 webpack 3: Official Release!! 🚀🍾',
            url: 'https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b',
            isRead: true,
        },
    ],
}
