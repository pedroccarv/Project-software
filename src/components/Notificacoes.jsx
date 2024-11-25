import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import "../styles/Notificacoes.css";
import NavBar from './NavBar';

function Notificacoes() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const form = useRef();

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (email === "" || subject === "" || message === "") {
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
          setStatus(`Notificação enviada para ${email}`);
          setEmail("");
          setMessage("");
          setSubject("");
        },
        (error) => {
          console.error("Erro ao enviar o email:", error);
          setStatus(`Erro ao enviar a notificação: ${error.message}`);
        }
      );
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
              Enviar Notificação por E-mail
            </h2>
          </div>
          <form ref={form} onSubmit={handleSendEmail} className="space-y-6">
            {/* Campo de E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Endereço de E-mail
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
                  placeholder="Digite o e-mail do destinatário"
                  aria-label="E-mail"
                />
              </div>
            </div>

            {/* Campo de Assunto */}
            <div>
              <label
                htmlFor="assunto"
                className="block text-sm font-medium text-gray-900"
              >
                Assunto
              </label>
              <div className="mt-2">
                <input
                  id="assunto"
                  name="assunto"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                  placeholder="Digite o assunto"
                  aria-label="Assunto"
                />
              </div>
            </div>

            {/* Campo de Mensagem */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-900"
              >
                Mensagem
              </label>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                  placeholder="Digite a mensagem"
                  rows="4"
                  aria-label="Mensagem"
                />
              </div>
            </div>

            {/* Botão de Enviar */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-500 p-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                Enviar
              </button>
            </div>
          </form>

          {status && (
            <p className="mt-4 text-center text-sm text-gray-500">
              {status}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Notificacoes;
