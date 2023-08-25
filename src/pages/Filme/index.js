import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./filme.css";

export const Filme = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id},`, {
          params: {
            api_key: "67c271cd643a6daa1fb5fa708a08f706",
            language: "pt-BR",
          },
        })
        .then((promise) => {
          setFilme(promise.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("erro!");
          navigation("/", { replace: true });
          return;
        });
    }
    loadFilme();
  }, [navigation, id]);

  const salvarFilme = () => {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const temFilmes = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (temFilmes) {
      toast.error("Este filme já está adicionado!")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  };

  if (loading) {
    return (
      <div className="filme-info">
        <h3>Carregando detalhes</h3>
      </div>
    );
  }

  return (
    <div key={filme.id} className="filme-info">
      <h3>{filme.title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h4>Sinopse</h4>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average}</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
};
