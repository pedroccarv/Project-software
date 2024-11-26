import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Toaster, toast } from 'sonner';
import NavBar from "./NavBar";
import Logo from "../assets/logo.png";

function ConvidarAmigos() {
  const [email, setEmail] = useState("");
  const [nomeDoAmigo, setNomeDoAmigo] = useState("");
  const [nomeRemetente, setNomeRemetente] = useState("");
  const [status, setStatus] = useState("");

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
          setStatus(`Convite enviado para ${email}`);
          setEmail("");
          setNomeDoAmigo("");
          setNomeRemetente("");
          toast.success('Convite enviado com sucesso!');
        },
        (error) => {
          console.error("Erro ao enviar o email:", error);
          setStatus(`Erro ao enviar o convite: ${error.message}`);
          toast.error('Erro ao enviar o convite');
        }
      );
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Convide um Amigo
            </h2>
          </div>
          <form
            ref={form}
            onSubmit={enviarConvite}
            className="space-y-6"
          >
            {/* Nome do Amigo */}
            <div>
              <label
                htmlFor="nomeDoAmigo"
                className="block text-sm font-medium text-gray-900"
              >
                Nome do Amigo
              </label>
              <div className="mt-2">
                <input
                  id="nomeDoAmigo"
                  name="to_name"
                  type="text"
                  required
                  value={nomeDoAmigo}
                  onChange={(e) => setNomeDoAmigo(e.target.value)}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                  placeholder="Digite o nome do amigo"
                  aria-label="Nome do Amigo"
                />
              </div>
            </div>

            {/* Nome Remetente */}
            <div>
              <label
                htmlFor="nomeRemetente"
                className="block text-sm font-medium text-gray-900"
              >
                Seu Nome
              </label>
              <div className="mt-2">
                <input
                  id="nomeRemetente"
                  name="from_name"
                  type="text"
                  required
                  value={nomeRemetente}
                  onChange={(e) => setNomeRemetente(e.target.value)}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                  placeholder="Digite seu nome"
                  aria-label="Seu Nome"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Seu E-mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                  placeholder="Digite seu e-mail"
                  aria-label="Seu E-mail"
                />
              </div>
            </div>

            {/* Botão Enviar Convite */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-500 p-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                Enviar Convite
              </button>
            </div>

            {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default ConvidarAmigos;
