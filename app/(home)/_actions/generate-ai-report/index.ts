"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error("Premium plan required");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  // pegar as transações do mês recebido
  const transactions = await db.transaction.findMany({
    where: {
      createdAt: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  });
  // mandar as transações para a Gemini AI e pedir para gerar o relatório com insights
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-${transaction.type}-R$${transaction.amount}-${transaction.category}`,
    )
    .join(";")}`;
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(content);

  // pegar o relatório gerado pela Gemini AI e retornar para o usuário
  const response = await result.response;
  const text = response.text();
  return text;
};
