import Image from "next/image";
import React from "react";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center gap-8 p-8">
        <Image src="logo.svg" alt="Finance AI" width={173} height={39} />
        <div>
          <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
          <p className="text-balance text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>
        </div>
        <Button variant="outline">
          <LogInIcon className="mr-2" />
          Faça Login
        </Button>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
