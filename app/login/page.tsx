import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-2">
      <div className="order-2 mx-auto flex h-full max-w-[550px] flex-col gap-8 p-8 sm:order-1 sm:justify-center">
        <Image src="logo.svg" alt="Finance AI" width={173} height={39} />
        <div>
          <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
          <p className="text-balance text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>
        </div>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Faça Login
          </Button>
        </SignInButton>
      </div>
      <div className="relative order-1 h-full w-full sm:order-2">
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
