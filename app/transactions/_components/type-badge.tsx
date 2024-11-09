import { Badge } from "@/app/_components/ui/badge";
import { TransactionType, type Transaction } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-success bg-opacity-5 font-bold text-success hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-destructive" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-white bg-opacity-10 font-bold text-white hover:bg-muted">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
