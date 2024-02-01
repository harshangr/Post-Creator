const commentsContainer = document.getElementById("commentsContainer");
const modal = document.getElementById("postModal");
const postNameInput = document.getElementById("postName");
const postBodyInput = document.getElementById("postBody");

// Placeholder array to simulate initial comments
let commentsData = [];

fetch("https://jsonplaceholder.typicode.com/comments")
    .then(res => res.json())
    .then(data => {
        commentsData = data;
        renderComments();
    })
    .catch(error => console.error('Fetch error:', error));

function renderComments() {
    const commentsHTML = commentsData.map(comment => `
        <div class="data-div">
            <p>${comment.name}</p>
            <p>${comment.body}</p>
            <button onclick="openUpdateModal(${comment.id})" class="btn">Update</button>
            <button onclick="deleteComment(${comment.id})" class="btn">Delete</button>
        </div>
    `).join('');

    commentsContainer.innerHTML = commentsHTML;
}

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function openUpdateModal(commentId) {
    // Find the comment in the array by ID (replace with actual logic)
    const commentToUpdate = commentsData.find(comment => comment.id === commentId);

    if (commentToUpdate) {
        // Populate the create post modal with the comment data
        postNameInput.value = commentToUpdate.name;
        postBodyInput.value = commentToUpdate.body;

        // Open the modal
        openModal();

        // Update the submit button to handle comment update
        const submitButton = document.getElementById("submitPostButton");
        submitButton.onclick = () => updateComment(commentId);
    }
}

function submitPost() {
    const postName = postNameInput.value;
    const postBody = postBodyInput.value;

    if (!postName || !postBody) {
        alert("Please enter both name and comment");
        return;
    }

    // Simulate adding a new comment to the array
    const newComment = {
        id: commentsData.length + 1, // Generate a new ID (replace with actual logic)
        name: postName,
        body: postBody
    };

    commentsData.unshift(newComment); // Add the new comment to the beginning of the array

    renderComments(); // Render the updated comments

    postNameInput.value = "";
    postBodyInput.value = "";

    closeModal();
}

function updateComment(commentId) {
    // Find the comment in the array by ID (replace with actual logic)
    const commentToUpdate = commentsData.find(comment => comment.id === commentId);

    if (commentToUpdate) {
        // Update the comment with values from the modal inputs
        commentToUpdate.name = postNameInput.value;
        commentToUpdate.body = postBodyInput.value;

        renderComments(); // Render the updated comments
        closeModal(); // Close the modal after updating
    }
}

function deleteComment(commentId) {
    // Assuming you want to confirm before deleting
    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
        // Filter out the comment with the specified ID (replace with actual logic)
        commentsData = commentsData.filter(comment => comment.id !== commentId);

        renderComments(); // Render the updated comments

        // Show an alert after deleting the post
    }
}