import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <Card
      className={`${size === "large" ? "col-span-1 bg-white bg-opacity-5 md:col-span-3" : ""} hover:bg-white hover:bg-opacity-5`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <div className="flex items-center gap-3">
          {icon}
          <p
            className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
          >
            {title}
          </p>
        </div>
        {size === "large" && (
          <div className="flex sm:hidden">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <p
            className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>
        </div>

        {size === "large" && (
          <div className="hidden sm:flex">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
