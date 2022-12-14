import "bootstrap/dist/css/bootstrap.min.css";
import OurNavbar from "./components/OurNavbar";
import NewsList from "./components/NewsList";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./components/Error";

function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("React");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://hn.algolia.com/api/v1/search?query=${search}&page=${page}`)
      .then((response) => {
        const res = response.data.hits;
        if (res.length === 0) {
          toast.error(`No matching results for ${search} `);
        } else {
          setNews(res);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoading(false);
      });
  }, [search, page]);

  if (error) {
    return <Error />;
  } else {
    return (
      <div className="App">
        <OurNavbar />
        <main className="content">
          <SearchBar news={news} setSearch={setSearch} />
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <NewsList news={news} setPage={setPage} />
          )}
        </main>
        <Footer news={news} setSearch={setSearch} />

        <ToastContainer />
      </div>
    );
  }
}

export default App;
