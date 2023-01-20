const updatePostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-desc').value.trim();
  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  }



document
.querySelector('.update-button')
.addEventListener('click', updatePostHandler);