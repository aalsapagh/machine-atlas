import { Package } from "lucide-react";
import type { MachineComponent } from "../../types/machine";
import { useTranslation } from "../../i18n/useTranslation";

export function SparePartsTab({ component }: { component: MachineComponent }) {
  const { t } = useTranslation();

  const stockLabel: Record<string, string> = {
    "in-stock": t("inStock"),
    "low-stock": t("lowStock"),
    "out-of-stock": t("outOfStock"),
  };

  if (component.spareParts.length === 0) {
    return <p className="text-sm text-industrial-muted">{t("noSpareParts")}</p>;
  }

  return (
    <div className="flex flex-col gap-2.5">
      {component.spareParts.map((sp) => (
        <div key={sp.partNumber} className="rounded-md border border-industrial-border bg-industrial-panel-alt p-3">
          <div className="flex items-center gap-1.5 text-sm font-medium text-industrial-text">
            <Package size={14} className="text-industrial-muted" />
            {sp.name}
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
            <dt className="text-industrial-muted">{t("partNumber")}</dt>
            <dd className="text-right font-mono text-industrial-text">{sp.partNumber}</dd>
            <dt className="text-industrial-muted">{t("quantity")}</dt>
            <dd className="text-right text-industrial-text">{sp.quantity}</dd>
            <dt className="text-industrial-muted">{t("supplier")}</dt>
            <dd className="text-right text-industrial-text">{sp.supplier}</dd>
            <dt className="text-industrial-muted">{t("stockStatus")}</dt>
            <dd className="text-right text-industrial-text">{stockLabel[sp.stockStatus]}</dd>
          </dl>
        </div>
      ))}
    </div>
  );
}
