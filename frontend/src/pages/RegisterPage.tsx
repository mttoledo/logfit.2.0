import React, { useState } from "react";
import logoImg from "../assets/logotipo.jpg";
import { Input } from "../components/Inputs";

const RegisterPage = () => {
  const [form, setForm] = useState({
    usuario: "",
    senha: "",
    idade: "",
    peso: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.usuario || !form.senha || !form.idade || !form.peso) {
      alert("Preencha todos os campos");
      return;
    }

    console.log("Formulário validado e enviado");
    setForm({ usuario: "", senha: "", idade: "", peso: "" });
  };

  return (
    <div className="w-full flex h-screen justify-center items-center bg-brand-blueargb">
      <main className="w-125 h-125 bg-brand-blue flex flex-col items-center p-10 rounded-2xl gap-4">
        <img src={logoImg} alt="LogFit" className="w-[200px] shrink-0 mb-6" />
        <p className="text-white">Para começar, informe seus dados:</p>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <Input
            placeholder="Seu Usuário"
            name="usuario"
            onChange={handleChange}
            value={form.usuario}
            required
          ></Input>
          <Input
            placeholder="Sua Senha:"
            name="senha"
            onChange={handleChange}
            value={form.senha}
            required
          ></Input>
          <Input
            placeholder="Sua Idade:"
            min="1"
            name="idade"
            onChange={handleChange}
            value={form.idade}
            required
          ></Input>
          <Input
            placeholder="Seu Peso:"
            min="1"
            name="peso"
            onChange={handleChange}
            value={form.peso}
            required
          ></Input>

          <p className="text-white text-center">
            Já tem uma conta?{" "}
            <span className="text-brand-lgblue hover:underline cursor-pointer">
              Faça login
            </span>
          </p>

          <button
            type="submit"
            className="bg-brand-mdblue text-white rounded-lg transition-all active:scale-95 cursor-pointer p-3 w-full hover:bg-brand-lgblue font-medium"
          >
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
