import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Post Not Found</h2>
      <p>Oops! It seems like you are lost.</p>
      <p>
        <Link to="/">Go back to Homepage</Link>
      </p>
    </main>
  )
}

export default Missing;