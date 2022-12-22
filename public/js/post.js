const commentFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#comment-name').value.trim();
  const comment = document.querySelector('#comment').value.trim();
  const post_id = document.querySelector('.comment-button').getAttribute('id');

  if (name && comment) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ name, comment, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/posts/${post_id}`);
    } else {
      alert('Failed to create comment.');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);


  // delete comment
const delCommentHandler = async (event) => {
    const id = event.target.id;
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  };

  const deleteComment = document
    .getElementsByClassName('delete-comment');
    console.log(deleteComment)
    for (let i = 0; i < deleteComment.length; i++) {
      deleteComment[i].addEventListener('click', delCommentHandler)
    }
