import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { EyeIcon } from "lucide-react";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex items-center gap-3">
          <p
            className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>
          {size === "large" && <EyeIcon size={28} />}
        </div>

        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
