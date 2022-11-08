let postsArray = [];
const form = document.getElementById('form');

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5);
        renderPosts()
    })


function renderPosts() {
    let html = "";
    for (let post of postsArray) {
        html += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr>
        `
    }
    document.getElementById("blog-list").innerHTML = html;
}


form.addEventListener("submit", function (event) {
    event.preventDefault()
    const postTitle = document.getElementById("new-post-title").value;
    const postBody = document.getElementById("new-post-body").value;
    const newPost = {
        title: postTitle,
        body: postBody
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            postsArray.unshift(data)
            renderPosts()
            form.reset()
        })

})