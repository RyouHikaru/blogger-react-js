import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((state) => state.editPost);
  const setEditTitle = useStoreActions((state) => state.setEditTitle);
  const setEditBody = useStoreActions((state) => state.setEditBody);

  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody])

  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody}
    editPost(updatedPost);
    navigate(`/post/${id}`)
  }

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
            <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
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