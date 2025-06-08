

export interface MenuItems {
  type: "link";
  id?: "all" | "Activo" | "Inactivo" | "Pendiente" | "Aprobado" | "Rechazado" | "Nuevo" | "Contactado" | "Negociacion" | "Cierre" | "Perfilado" | "No_perfilado";
 icon?: string;
  label: string;
  value?: number;
  class?: {
    icon?: string;
  };
  size?: string;
}
