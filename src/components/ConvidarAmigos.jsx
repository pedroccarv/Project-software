import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "../styles/ConvidarAmigos.css";
import { Link } from "react-router-dom";

function ConvidarAmigos() {
  const [email, setEmail] = useState("");
  const [nomeDoAmigo, setNomeDoAmigo] = useState("");
  const [nomeRemetente, setNomeRemetente] = useState("");
  const [status, setStatus] = useState("");

  // const enviarConvite = async () => {
  //     try {
  //         const response = await fetch('http://localhost:5000/enviar-convite', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ email, nomeDoAmigo }),
  //         });

  //         const result = await response.json();
  //         if (result.success) {
  //             setStatus(`Convite enviado para ${email}`);
  //         } else {
  //             setStatus(`Falha ao enviar o convite: ${result.error}`);
  //         }
  //     } catch (error) {
  //         setStatus(`Erro ao conectar ao servidor: ${error.message}`);
  //     }
  // };

  const form = useRef();

  const enviarConvite = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ozfjrvj",
        "template_azxykcv",
        form.current,
        "HtxHIjZxGZm0L6CaT"
      )
      .then(
        (result) => {
          console.log("Email foi enviado com sucesso!");
          setStatus(`Convite enviado para ${email}`, result.status);
          setEmail("");
          setNomeDoAmigo("");
          setNomeRemetente("");
        },
        (error) => {
          console.error("Erro ao enviar o email:", error);
          setStatus(`Erro ao enviar o convite: ${error.message}`);
        }
      );
  };

  return (
    <div className="rotas">
    <Link to="/login" className="link-rota">Login</Link>
    <Link to="/cadastro" className="link-rota">Cadastro</Link>
    <Link to="/editar-perfil" className="link-rota">Editar Perfil</Link>
    <Link to="/mapa" className="link-rota">Mapa</Link>
    <Link to="/favoritar-partida" className="link-rota">Partidas Favoritas</Link>
    <Link to="/detalhes-partida" className="link-rota">Detalhes Partidas</Link>
    <Link to="/cadastro-partida" className="link-rota">Cadastro Partidas</Link>
    <Link to="/historico-partidas" className="link-rota">Historico Partidas</Link>
    <Link to="/pagamento" className="link-rota">Pagamento</Link>
    <Link to="/contato" className="link-rota">Contato</Link>
    <Link to="/historico-conquistas" className="link-rota">Historico  conquistas</Link>
    <Link to="/notificacoes" className="link-rota">Notificacoes</Link>
    <Link to="/chat" className="link-rota">Chat</Link>
    <Link to="/upload-imagem" className="link-rota">Imagem</Link>
    <Link to="/avaliacao-partida" className="link-rota">Avaliacao partida</Link>
    <Link to="/convidar-amigos" className="link-rota">Convidar amigos</Link>
    <form
      ref={form}
      onSubmit={enviarConvite}
      className="convidar-amigos-container"
    >
      <h2>Convide um amigo</h2>
      <input
        type="text"
        name="to_name"
        value={nomeDoAmigo}
        onChange={(e) => setNomeDoAmigo(e.target.value)}
        placeholder="Nome do amigo"
      />
      <input
        type="text"
        name="from_name"
        value={nomeRemetente}
        onChange={(e) => setNomeRemetente(e.target.value)}
        placeholder="Seu nome"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail"
      />
      <button onClick={enviarConvite}>Enviar Convite</button>
      {status && <p>{status}</p>}
    </form>
    </div>
  );
}

export default ConvidarAmigos;
