const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

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
        document.body.innerHTML =
            posts.map(post => `
                <div>
                    <h3>${post.title} by ${userMap[post.userId].name}</h3>
                    <p>${post.body}</p>
                    <br>
                </div>
            `).join('');
    })


