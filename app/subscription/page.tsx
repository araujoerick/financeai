import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <div className="overflow-y-auto">
        <Navbar />
        <div className="mx-auto max-w-[2012px] space-y-6 p-4 sm:p-6">
          <h1 className="text-2xl font-bold">Assinatura</h1>

          <div className="flex flex-col-reverse flex-wrap justify-center gap-6 sm:flex-row">
            <Card className="mx-auto w-72 sm:mx-0 sm:w-[450px]">
              <CardHeader className="border-b border-solid py-8">
                <h2 className="text-center text-2xl font-semibold">
                  Plano Básico
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="text-6xl font-semibold">0</span>
                  <span className="text-2xl text-muted-foreground">mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 py-8">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p className="max-w-[20ch] sm:max-w-full">
                    Apenas 10 transações por mês ({currentMonthTransactions}/10)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon />
                  <p>Relatórios de IA</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mx-auto w-72 sm:mx-0 sm:w-[450px]">
              <CardHeader className="relative mt-1 border-b border-solid py-8">
                {hasPremiumPlan ? (
                  <Badge className="absolute left-2 top-2 bg-primary/10 text-sm text-primary sm:left-6 sm:top-10">
                    Atual
                  </Badge>
                ) : (
                  <Badge className="absolute left-2 top-2 bg-primary/10 text-sm text-primary sm:left-6 sm:top-10">
                    Popular
                  </Badge>
                )}
                <h2 className="text-center text-2xl font-semibold">
                  Plano Premium
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="text-6xl font-semibold">19</span>
                  <span className="text-2xl text-muted-foreground">mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 py-8">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>Transações ilimitadas</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>Relatórios de IA</p>
                </div>
                <AcquirePlanButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
