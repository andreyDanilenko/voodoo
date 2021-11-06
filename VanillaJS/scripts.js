const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const postsList = document.querySelector('.posts')
const searchInput = document.querySelector('.input')

function createPostItem(post, user) {
    const postItem = document.createElement("li");
    postItem.classList.add('post');

    const postTitle = document.createElement("h2");
    postTitle.classList.add('title');
    postTitle.innerHTML = post.title;
    postItem.appendChild(postTitle);

    const postDesc = document.createElement("p");
    postDesc.classList.add('description');
    postDesc.innerHTML = post.title;
    postItem.appendChild(postDesc);

    const postAuthor = document.createElement("p");
    postAuthor.classList.add('author');
    postAuthor.innerHTML = user[post.userId].name;
    postItem.appendChild(postAuthor);

    postsList.appendChild(postItem);
};

function fetchPosts() {
    return fetch(POSTS_URL)
        .then(res => res.json());
}

function fetchUsers() {
    return fetch(USERS_URL)
        .then(res => res.json())
        .then(users => {
            return users.reduce((map, user) => {
                map[user.id] = user;
                return map;
            }, {});
        });
}

Promise.all([fetchPosts(), fetchUsers()])
    .then(([posts, userMap]) => {
        posts.map(post => createPostItem(post, userMap))
        searchInput.addEventListener('input', (e) => {
            array = posts.filter(post => userMap[post.userId].name.toLowerCase().includes(e.target.value.toLowerCase()))
            const postItem = document.querySelectorAll('.post')
            postItem.forEach(item => {
                item.remove()
            })
            array.map(post => createPostItem(post, userMap))
        })
    })
