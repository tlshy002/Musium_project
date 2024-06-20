document.addEventListener('DOMContentLoaded', function() {
    const postList = document.getElementById('post-list');
    const postForm = document.getElementById('post-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    // Load posts from server
    function loadPosts() {
        fetch('http://localhost:3000/api/posts')
            .then(response => response.json())
            .then(data => {
                postList.innerHTML = '';
                data.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.className = 'post';
                    postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
                    postList.appendChild(postDiv);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));
    }

    // Add new post
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newPost = {
            title: titleInput.value,
            content: contentInput.value
        };

        fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(data => {
            titleInput.value = '';
            contentInput.value = '';
            loadPosts();
        })
        .catch(error => console.error('Error adding post:', error));
    });

    // Initial load
    loadPosts();
});
