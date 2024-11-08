import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "../styles/ConvidarAmigos.css";
import NavBar from "./NavBar";

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
    <>
    <NavBar />
    <form
      ref={form}
      onSubmit={enviarConvite}
      className="convidar-amigos-container"
    >
      <h2>Convide um amigo</h2>
      <input
        type="text"
        name="to_name"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"

        value={nomeDoAmigo}
        onChange={(e) => setNomeDoAmigo(e.target.value)}
        placeholder="Nome do amigo"
      />
      <input
        type="text"
        name="from_name"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"

        value={nomeRemetente}
        onChange={(e) => setNomeRemetente(e.target.value)}
        placeholder="Seu nome"
      />
      <input
        type="email"
        name="email"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"

        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail"
      />
      <button onClick={enviarConvite}>Enviar Convite</button>
      {status && <p>{status}</p>}
    </form>
    </>
  );
}

export default ConvidarAmigos;
