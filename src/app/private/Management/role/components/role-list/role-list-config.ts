import { TableColumns } from "../../../../../core/models/list-table.interface";
import { RoleResponse } from "../../models/role-response.interface";

const tableColumns: TableColumns<RoleResponse>[] = [
  
  {
    label: "NOMBRE",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "name",
    cssProperty: ["text-sm", "text-center"],
    type: "text",
    sticky: true,
    sort: false,
   // sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "DESCRIPCIÖN",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "description",
    cssProperty: ["text-sm", "text-center"],
    type: "text",
    sticky: false,
    sort: false,
   // sortProperty:"description",
    visible: true,
    download: true,
  },

  {
    label: "ACCIONES",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "actions",
    cssProperty: ["text-sm", "text-left"],
    type: "actions",
    sticky: false,
    sort: false, 
    visible: true,
    download: false,
  }
 
];




export const componentSettings = {
  tableColumns,
};




