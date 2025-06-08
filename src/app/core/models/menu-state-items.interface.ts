export interface MenuStateItems {
    type: "link";
    id?: "all" | "PENDIENTE" | "EVALUACION" | "INSPECCION" | "OBSERVADA" | "RECHAZADA" | "APROBADA" | "CLIENTE_CREDITO" | "CLIENTE_CANCELO_CREDITO" | "CLIENTE_VUELVE_COMPRAR_A_CREDITO";
    icon?: string;
    label: string;
    value?: number;
    class?: {
      icon?: string;
    };
    size?: string;
  }
  