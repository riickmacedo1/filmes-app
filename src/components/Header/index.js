import "./style.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link className="logo" to="/">
        TopFilmes
      </Link>

      <Link className="favoritos" to="/favoritos">
        Meus filmes
      </Link>
    </header>
  );
};
