import "../assets/css/errorPage.css";
const NotFoundPage = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            4<span></span>4
          </h1>
        </div>
        <h2>Oops! Page Not Be Found</h2>
        <p>Sorry but the page you are looking for does not exist</p>
        <a href="/">Back to homepage</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
