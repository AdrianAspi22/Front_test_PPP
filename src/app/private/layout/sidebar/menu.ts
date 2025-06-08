import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'Research Area',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    permision: ["Permissions.ResearchAreas.Menu"],
    subItems: [
      {
        id: 3,
        label: 'Research Area',
        link: '/private/research-area',
        parentId: 2
      }
    ]
  },

  {
    id: 4,
    label: 'Research Company',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    subItems: [
      {
        id: 5,
        label: 'Research Company',
        link: '/private/research-company',
        parentId: 4
      }
    ]
  },

  {
    id: 2211,
    label: 'Research Group',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    permision: ["Permissions.ResearchGroups.Menu"],
    subItems: [
      {
        id: 2212,
        label: 'Research Group',
        link: '/private/research-group',
        parentId: 2211
      }
    ]
  },
  {
    id: 6,
    label: 'Research Line',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    permision: ["Permissions.ResearchLines.Menu"],
    subItems: [
      {
        id: 7,
        label: 'Research Line',
        link: '/private/research-line',
        parentId: 6
      }
    ]
  },

  {
    id: 8,
    label: 'Solicitar Asesoría',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    permision: ["Permissions.AdvisoringContracts.Menu"],
    subItems: [
      {
        id: 9,
        label: 'Crear Solicitud de Contrato',
        link: '/private/advisoring-contract',
        parentId: 8
      }
    ]
  },

  {
    id: 10,
    label: 'Advisoring Request',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    permision: ["Permissions.AdvisoringRequests.Menu"],
    subItems: [
      {
        id: 11,
        label: 'Advisoring Request',
        link: '/private/advisoring-request',
        parentId: 10
      }
    ]
  },

  {
    id: 12,
    label: 'Calendario Académico',
    icon: 'ri-calendar-2-line',
    isCollapsed: true,
    permision: ["Permissions.GoogleCalendars.Menu"],
    subItems: [
      {
        id: 13,
        label: 'Calendario',
        link: '/private/google-calendar',
        parentId: 12
      }
    ]
  },
    
  {
    id: 14,
    label: 'REGISTROS',
    isTitle: true
  },

  {
    id: 15,
    label: 'Management',
    icon: 'settings',
    isCollapsed: true,
    permision: ["Permissions.Roles.Menu"],
    subItems: [
      {
        id: 16,
        label: 'Users',
        link: '/private/users',
        parentId: 15
      },
      {
        id: 17,
        label: 'Roles',
        link: '/private/roles',
        parentId: 15
      }
    ]
  },

  {
    id: 18,
    label: 'PROYECTOS I+D+I',
    isTitle: true
  },
  {
    id: 19,
    label: 'Proyecto',
    icon: 'settings',
    isCollapsed: true,
    permision: ["Permissions.Actors.Menu"],
    subItems: [
      {
        id: 20,
        label: 'Lista',
        link: '/private/actor',
        parentId: 19
      },
      {
        id: 21,
        label: 'Registro',
        link: '/private/actor',
        parentId: 19
      },
      {
        id: 22,
        label: 'Reporte',
        link: '/private/actor',
        parentId: 19
      }
    ]
  },
 /*  {
    id: 4,
    label: 'MENUITEMS.APPS.TEXT',
    icon: 'ri-apps-2-line',
    isCollapsed: true,
    subItems: [

      {
        id: 5,
        label: 'MENUITEMS.APPS.LIST.CALENDAR',
        isCollapsed: true,
        parentId: 4,
        subItems: [
          {
            id: 5,
            label: 'MENUITEMS.APPS.LIST.MAINCALENDAR',
            link: '/calendar',
          },
          {
            id: 5,
            label: 'MENUITEMS.APPS.LIST.MONTHGRID',
            link: '/month-grid',
          }
        ]
      },
    ]
  },
  {
    id: 6,
    label: 'MENUITEMS.PAGES.TEXT',
    isTitle: true
  },
  {
    id: 7,
    label: 'MENUITEMS.AUTHENTICATION.TEXT',
    icon: 'ri-account-circle-line',
    isCollapsed: true,
    subItems: [
      {
        id: 8,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNIN',
        parentId: 7,
        subItems: [
          {
            id: 9,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/signin/basic',
            parentId: 8
          },
          {
            id: 10,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/signin/cover',
            parentId: 8
          },
        ]
      },
      {
        id: 11,
        label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDRESET',
        parentId: 7,
        isCollapsed: true,
        subItems: [
          {
            id: 12,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/pass-reset/basic',
            parentId: 11
          },
          {
            id: 13,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/pass-reset/cover',
            parentId: 11
          },
        ]
      },
      {
        id: 14,
        label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDCREATE',
        parentId: 7,
        isCollapsed: true,
        subItems: [
          {
            id: 15,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/pass-create/basic',
            parentId: 14
          },
          {
            id: 16,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/pass-create/cover',
            parentId: 14
          },
        ]
      },
      {
        id: 17,
        label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
        parentId: 7,
        isCollapsed: true,
        subItems: [
          {
            id: 18,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/lockscreen/basic',
            parentId: 17
          },
          {
            id: 19,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/lockscreen/cover',
            parentId: 17
          },
        ]
      },
      {
        id: 20,
        label: 'MENUITEMS.AUTHENTICATION.LIST.LOGOUT',
        parentId: 7,
        isCollapsed: true,
        subItems: [
          {
            id: 21,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/logout/basic',
            parentId: 20
          },
          {
            id: 22,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/logout/cover',
            parentId: 20
          },
        ]
      },
    ]
  },
  {
    id: 23,
    label: 'MENUITEMS.PAGES.TEXT',
    icon: 'ri-pages-line',
    isCollapsed: true,
    subItems: [
      {
        id: 24,
        label: 'MENUITEMS.PAGES.LIST.PROFILE',
        link: '/pages/profile',
        parentId: 23,
      },
    ]
  },
  {
    id: 25,
    label: 'MENUITEMS.RESEARCHS.TEXT',
    icon: 'ri-git-repository-line',
    isCollapsed: true,
    subItems: [
      {
        id: 26,
        label: 'MENUITEMS.RESEARCHS.LIST.RESEARCHGROUP',
        link: '/researchs/research-group',
        parentId: 25
      },
      {
        id: 27,
        label: 'MENUITEMS.RESEARCHS.LIST.RESEARCHAREA',
        link: '/researchs/research-area',
        parentId: 25
      },
      {
        id: 28,
        label: 'MENUITEMS.RESEARCHS.LIST.RESEARCHLINE',
        link: '/researchs/research-line',
        parentId: 25
      },
      {
        id: 29,
        label: 'MENUITEMS.RESEARCHS.LIST.ADVISOR',
        link: '/researchs/advisor',
        parentId: 25
      }
    ]
  },


// TODOS LOS COMPONENTES ESTÁN AQUI!!!!!!!!!!!!!!!!

  {
    id: 96,
    label: 'COMPONENTS',
    isTitle: true
  },
  {
    id: 97,
    label: 'MENUITEMS.BASEUI.TEXT',
    icon: 'ri-pencil-ruler-2-line',
    isCollapsed: true,
    subItems: [
      {
        id: 98,
        label: 'MENUITEMS.BASEUI.LIST.ALERTS',
        link: '/ui/alerts',
        parentId: 97
      },
      {
        id: 99,
        label: 'MENUITEMS.BASEUI.LIST.BADGES',
        link: '/ui/badges',
        parentId: 97
      },
      {
        id: 100,
        label: 'MENUITEMS.BASEUI.LIST.BUTTONS',
        link: '/ui/buttons',
        parentId: 97
      },
      {
        id: 101,
        label: 'MENUITEMS.BASEUI.LIST.COLORS',
        link: '/ui/colors',
        parentId: 97
      },
      {
        id: 102,
        label: 'MENUITEMS.BASEUI.LIST.CARDS',
        link: '/ui/cards',
        parentId: 97
      },
      {
        id: 104,
        label: 'MENUITEMS.BASEUI.LIST.DROPDOWNS',
        link: '/ui/dropdowns',
        parentId: 97
      },
      {
        id: 105,
        label: 'MENUITEMS.BASEUI.LIST.GRID',
        link: '/ui/grid',
        parentId: 97
      },
      {
        id: 106,
        label: 'MENUITEMS.BASEUI.LIST.IMAGES',
        link: '/ui/images',
        parentId: 97
      },
      {
        id: 107,
        label: 'MENUITEMS.BASEUI.LIST.TABS',
        link: '/ui/tabs',
        parentId: 97
      },
      {
        id: 108,
        label: 'MENUITEMS.BASEUI.LIST.ACCORDION&COLLAPSE',
        link: '/ui/accordions',
        parentId: 97
      },
      {
        id: 109,
        label: 'MENUITEMS.BASEUI.LIST.MODALS',
        link: '/ui/modals',
        parentId: 97
      },
      {
        id: 111,
        label: 'MENUITEMS.BASEUI.LIST.PLACEHOLDERS',
        link: '/ui/placeholder',
        parentId: 97
      },
      {
        id: 112,
        label: 'MENUITEMS.BASEUI.LIST.PROGRESS',
        link: '/ui/progress',
        parentId: 97
      },
      {
        id: 113,
        label: 'MENUITEMS.BASEUI.LIST.NOTIFICATIONS',
        link: '/ui/notifications',
        parentId: 97
      },
      {
        id: 116,
        label: 'MENUITEMS.BASEUI.LIST.TYPOGRAPHY',
        link: '/ui/typography',
        parentId: 97
      },
      {
        id: 117,
        label: 'MENUITEMS.BASEUI.LIST.LISTS',
        link: '/ui/list',
        parentId: 97
      },
      {
        id: 117,
        label: 'MENUITEMS.BASEUI.LIST.LINKS',
        link: '/ui/links',
        badge: {
          variant: 'bg-success',
          text: 'MENUITEMS.DASHBOARD.BADGE',
        },
        parentId: 97
      },
      {
        id: 118,
        label: 'MENUITEMS.BASEUI.LIST.GENERAL',
        link: '/ui/general',
        parentId: 97
      },
    ]
  },
  {
    id: 121,
    label: 'MENUITEMS.ADVANCEUI.TEXT',
    icon: 'ri-stack-line',
    isCollapsed: true,
    subItems: [
      {
        id: 122,
        label: 'MENUITEMS.ADVANCEUI.LIST.SWEETALERTS',
        link: '/advance-ui/sweetalerts',
        parentId: 121
      },
      {
        id: 126,
        label: 'MENUITEMS.ADVANCEUI.LIST.TOUR',
        link: '/advance-ui/tour',
        parentId: 121
      },
    ]
  },
  {
    id: 132,
    label: 'MENUITEMS.FORMS.TEXT',
    icon: 'ri-file-list-3-line',
    isCollapsed: true,
    subItems: [
      {
        id: 133,
        label: 'MENUITEMS.FORMS.LIST.BASICELEMENTS',
        link: '/forms/basic',
        parentId: 132
      },
      {
        id: 134,
        label: 'MENUITEMS.FORMS.LIST.FORMSELECT',
        link: '/forms/select',
        parentId: 132
      },
      {
        id: 135,
        label: 'MENUITEMS.FORMS.LIST.CHECKBOXS&RADIOS',
        link: '/forms/checkboxs-radios',
        parentId: 132
      },
      {
        id: 136,
        label: 'MENUITEMS.FORMS.LIST.PICKERS',
        link: '/forms/pickers',
        parentId: 132
      },
      {
        id: 137,
        label: 'MENUITEMS.FORMS.LIST.INPUTMASKS',
        link: '/forms/masks',
        parentId: 132
      },
      {
        id: 138,
        label: 'MENUITEMS.FORMS.LIST.ADVANCED',
        link: '/forms/advanced',
        parentId: 132
      },
      {
        id: 139,
        label: 'MENUITEMS.FORMS.LIST.RANGESLIDER',
        link: '/forms/range-sliders',
        parentId: 132
      },
      {
        id: 140,
        label: 'MENUITEMS.FORMS.LIST.VALIDATION',
        link: '/forms/validation',
        parentId: 132
      },
      {
        id: 141,
        label: 'MENUITEMS.FORMS.LIST.WIZARD',
        link: '/forms/wizard',
        parentId: 132
      },
      {
        id: 142,
        label: 'MENUITEMS.FORMS.LIST.EDITORS',
        link: '/forms/editors',
        parentId: 132
      },
      {
        id: 143,
        label: 'MENUITEMS.FORMS.LIST.FILEUPLOADS',
        link: '/forms/file-uploads',
        parentId: 132
      },
      {
        id: 144,
        label: 'MENUITEMS.FORMS.LIST.FORMLAYOUTS',
        link: '/forms/layouts',
        parentId: 132
      }
    ]
  },
  {
    id: 170,
    label: 'MENUITEMS.ICONS.TEXT',
    icon: 'ri-compasses-2-line',
    isCollapsed: true,
    subItems: [
      {
        id: 171,
        label: 'MENUITEMS.ICONS.LIST.REMIX',
        link: '/icons/remix',
        parentId: 170
      },
      {
        id: 172,
        label: 'MENUITEMS.ICONS.LIST.BOXICONS',
        link: '/icons/boxicons',
        parentId: 170
      },
      {
        id: 173,
        label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
        link: '/icons/materialdesign',
        parentId: 170
      },
      {
        id: 174,
        label: 'MENUITEMS.ICONS.LIST.LINEAWESOME',
        link: '/icons/lineawesome',
        parentId: 170
      },
      {
        id: 175,
        label: 'MENUITEMS.ICONS.LIST.FEATHER',
        link: '/icons/feather',
        parentId: 170
      },
    ]
  }, */
];
