import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import "../styles/Notificacoes.css";
import { Link } from "react-router-dom";

function Notificacoes() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const form = useRef();

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (email == "" || subject == "" || message == "") {
      setStatus("Preencha todos os campos");
      return;
    }

    emailjs
      .sendForm(
        "service_ozfjrvj",
        "template_doo0rrq",
        form.current,
        "HtxHIjZxGZm0L6CaT"
      )
      .then(
        (result) => {
          console.log("Email foi enviado com sucesso!");
          setStatus(`Notificação enviado para ${email}`, result.status);
          setEmail("");
          setMessage("");
          setSubject("");
        },
        (error) => {
          console.error("Erro ao enviar o email:", error);
          setStatus(`Erro ao enviar a notificação: ${error.message}`);
        }
      );

    // try {
    //   const response = await fetch('/api/send-email', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, subject, message }),
    //   });

    //   if (response.ok) {
    //     setStatus('E-mail enviado com sucesso!');
    //   } else {
    //     setStatus('Falha ao enviar o e-mail.');
    //   }
    // } catch (error) {
    //   setStatus('Erro ao enviar o e-mail.');
    // }
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
    <div>
      <h1>Enviar Notificação por E-mail</h1>
      <form ref={form} onSubmit={handleSendEmail}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          name="assunto"
          placeholder="Assunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensagem"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {status && <p>{status}</p>}
    </div>
    </div>
  );
}

export default Notificacoes;
