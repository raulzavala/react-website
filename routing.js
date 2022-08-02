function Item({ elem, i, name}) {
  return <a className="dropdown-item" href={elem} target="_blank">&nbsp;{name}</a>;
}

function App() {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState();

  React.useEffect(() => {
    axios
      .get("https://api.github.com/users/raulzavala/repos")
      .then((response) => {
        setData(response.data);
        setLoading(true);
      });
  }, []);

  if (isLoading) {
    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <h1> My Coding Place</h1>
        </a>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Repositories
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          {data.map((element, i) => (
              <li key={i}>
                <Item elem={element["html_url"]} name={element["full_name"]} i={i} />
              </li>
            ))}
          </ul>
        </li>
      </nav>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
