import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/MyNav";
import "./components/MyFooter";
import "./components/Welcome";
import "./components/AllTheBooks";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import Welcome from "./components/Welcome";
import AllTheBooks from "./components/AllTheBooks";
import BookList from "./components/BookList";
import scifi from "./data/scifi.json";
import history from "./data/history.json";
import romance from "./data/romance.json";
import fantasy from "./data/fantasy.json";
import horror from "./data/horror.json";

const App = function () {
  return (
    <>
      <MyNav />
      <Welcome />
      <AllTheBooks />
      <BookList books={scifi} />
      <BookList books={history} />
      <BookList books={romance} />
      <BookList books={fantasy} />
      <BookList books={horror} />

      <MyFooter />
    </>
  );
};

export default App;
