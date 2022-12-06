import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
  posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody
}) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody])

  return (
    <main className="NewPost">
      {editTitle &&
        <>
          <h2>Edit Post</h2>
          <form onSubmit={(e) => e.preventDefault()} className="newPostForm">
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text" 
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea 
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
          </form>
        </>
      }
      {!editTitle &&
        <>
          <h2>Post Not Found</h2>
          <p>Oops! It seems like you are lost.</p>
          <p>
            <Link to="/">Go back to Homepage</Link>
          </p>
        </>
      }
    </main>
  )
}

export default EditPost;