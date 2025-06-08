export interface TableColumn {
    label: string;
    def: string;
    formatt?: string;
    dataType?: Date | object;
  }


  export interface TableColumns {
    key: string;
    header: string;
    actions?: Array<TableAction>;
  }
  
  export interface TableAction {
    label: string;
    icon: string;
    action: (row: any) => void;
  }