import { MenuItems } from "../../../../core/models/menu-items.interface";
import { TableColumns } from "../../../../core/models/list-table.interface";
import { UserDto } from "../../../../core/models/user/userDto.interface";
import { SearchOptions } from "../../../../core/models/search-options.interface";
import { GenericValidators } from "../../../../core/utils/validators/generic-validators";

const searchOptions: SearchOptions[] = [
  {
    label: "Usuario",
    value: 1,
    placeholder: "Buscar por Nombres, Apellidos, etc",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda.",
    icon: "icName",
  }
];

const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    icon: "view_headline",
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    value: 1,
    icon: "label",
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    value: 0,
    icon: "label",
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

const tableColumns: TableColumns<UserDto>[] = [
  
  {
    label: "USUARIO",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "userName",
    cssProperty: ["text-sm","text-center"],
    type: "text",
    sticky: true,
    sort: false,
   // sortProperty: "userName",
    visible: true,
    download: true,
  },
  {
    label: "NOMBRE",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "firstName",
    cssProperty: ["text-sm", "text-center"],
    type: "text",
    sticky: false,
    sort: false,
    //sortProperty:"firstName",
    visible: true,
    download: true,
  },
  {
    label: "APELLIDOS",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "lastName",
    cssProperty: ["text-sm", "text-center"],
    type: "text",
    sticky: false,
    sort: false,
    //sortProperty:"lastName",
    visible: true,
    download: true,
  },
  {
    label: "CORREO",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "email",
    cssProperty: ["text-sm", "text-center"],
    type: "text",
    sticky: false,
    sort: false,
    //sortProperty:"email",
    visible: true,
    download: true,
  },
  /* {
    label: "TELEFONO",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "phoneNumber",
    cssProperty: ["text-sm", "text-center"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty:"phoneNumber",
    visible: true,
    download: true,
  }, */

  {
    label: "CARGO",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "chargeName",
    cssProperty: ["text-sm", "text-center"],
    type: "text",
    sticky: false,
    sort: false,
    //sortProperty:"chargeName",
    visible: true,
    download: true,
  },
  {
    label: "REPORTA A:",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "reportUser",
    cssProperty: ["text-sm", "text-center"],
    type: "text",
    sticky: false,
    sort: false,
    //sortProperty:"reportUser",
    visible: true,
    download: true,
  },
  {
    label: "ESTADO",
    cssLabel: ["font-bold", "text-sm","text-center"],
    property: "userStatus",
    cssProperty: ["text-sm", "text-center"],
    type: "badge",
    sticky: false,
    sort: false,
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

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const getInputs: string = "";



export const componentSettings = {
  searchOptions,
  tableColumns,
  filters,
  resetFilters,
  getInputs,
  menuItems,
};




