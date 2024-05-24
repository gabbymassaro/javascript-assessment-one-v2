/*
Try Next:
5. Ability to update a comment

BONUS: 
A user should be able to type a search term into the filter comments input
    The comments list should only display comments containing the search term
    If the user clears the filter input, all comments should be displayed again.
*/

document.addEventListener('DOMContentLoaded', function(e) {
  e.preventDefault()
  let commentList = document.getElementById("comment-list")
  let commentForm = document.getElementById("comment-form") 
  let comment = document.getElementById("add-comment-input").value

  fetch("http://localhost:3000/comments")
    .then(response => response.json())
    .then(data => {
      data.forEach(renderComments)
    })

  const renderComments = (comment) => {
    let commentBox = document.createElement("li")

    let span = document.createElement("span")
    let deleteBtn = document.createElement("button")
    let updateBtn = document.createElement("button")
    
    commentBox.className = "list-group-item"
    deleteBtn.className = "btn btn-danger btn-sm pull-right"
    updateBtn.className = "btn btn-success btn-sm pull-right"

    span.textContent = comment.content
    deleteBtn.textContent = "Delete"
    updateBtn.textContent = "Update"

    deleteBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, 
      })
        .then(function (response) {
          return response.json()
        })
        .then(data => {
        console.log(data)
          deleteBtn.parentNode.remove()
        })
    })

    commentList.appendChild(commentBox)
    commentBox.appendChild(span)
    commentBox.appendChild(deleteBtn)
    commentBox.appendChild(updateBtn)
  }

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    comment = document.getElementById("add-comment-input").value

    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({content: comment})
    })
      .then(function (response) {
        return response.json()
      })
      .then(data => {
        (renderComments(data))
      })
  })
})