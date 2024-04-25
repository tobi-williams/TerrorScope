import '../styling/NoPage.css'

function NoPage() {
    return (
      <div className="not-found-container">
        <h1>404</h1>
        <p>Oops! The page you're looking for isn't here.</p>
        <a href="/home">Go Home</a>
      </div>
    );
}

export default NoPage;