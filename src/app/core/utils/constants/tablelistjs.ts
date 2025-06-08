const ListJsGroup = [
    {
      id:1,
      group_name: 'Grupo de Investigación Ingeniería de Software',
      acronym: 'GINSOFT',
      coordinator: 'Brian, Pando Soto',
      description: 'Promover, realizar y difundir principalmente investigación aplicada en ingeniería de software y computación en respuesta a necesidades teóricas y prácticas de los distintos sectores productivos dentro del ámbito de influencia de la Universidad Nacional Agraria de la Selva.'
    },
    {
      id:2,
      group_name: 'Grupo de Investigación de Redes, Seguridad y Gestión de TI',
      acronym: 'RESEGTI',
      coordinator:'William, Marchand Niño',
      description: 'Explorar, generar, innovar y gestionar plataformas de TI para el soporte y sostenibilidad de los sistemas información.'
    },
    {
      id:3,
      group_name: 'Grupo Sistemas de Información',
      acronym: 'GISI',
      coordinator: 'George, Paucar Palomino',
      description: 'Explorar, generar, innovar y gestionar soluciones de SI para el soporte y sostenibilidad de los sistemas productivos, institucionales y organizacionales.'
    },
  ];

  const ListJsArea = [
    {
      id:1,
      area_name: 'Area 1',
      group_area_acronym: 'GINSOFT',
    },
    {
      id:2,
      area_name: 'Area 2',
      group_area_acronym: 'RESEGTI',
    },
    {
      id:3,
      area_name: 'Area 3',
      group_area_acronym: 'GISI',
    },
  ];

  const ListJsLine = [
    {
      id:1,
      line_name: 'Ciberseguridad',
      group_line_acronym: 'RESEGTI',
    },
    {
      id:2,
      line_name: 'Redes e Infraestructura de TI',
      group_line_acronym: 'RESEGTI',
    },
    {
      id:3,
      line_name: 'Internet de las cosas',
      group_line_acronym: 'RESEGTI',
    },
    {
      id:4,
      line_name: 'Seguridad de la información',
      group_line_acronym: 'RESEGTI',
    },
    {
      id:5,
      line_name: 'Gestión de procesos de negocio',
      group_line_acronym: 'GISI',
    },
    {
      id:6,
      line_name: 'Arquitectura empresarial',
      group_line_acronym: 'GISI',
    },
    {
      id:7,
      line_name: 'Gestión de datos',
      group_line_acronym: 'GISI',
    },
    {
      id:8,
      line_name: 'Calidad de software',
      group_line_acronym: 'GISI',
    },
    {
      id:9,
      line_name: 'Arquitectura de software',
      group_line_acronym: 'GINSOFT',
    },
    {
      id:10,
      line_name: 'Procesos de software',
      group_line_acronym: 'GINSOFT',
    },
    {
      id:11,
      line_name: 'Ingeniería de requisitos',
      group_line_acronym: 'GINSOFT',
    },
    {
      id:12,
      line_name: 'Construcción de software',
      group_line_acronym: 'GINSOFT',
    },
    {
      id:13,
      line_name: 'Computación',
      group_line_acronym: 'GINSOFT',
    },
  ];

  const ListJsAdvisor = [
    {
      id:1,
      first_name:'Ronald',
      last_name:'Ibarra',
      academic_degree: 'Magister',
      document_number: '45212546',
      email:'ronald.ibarra@unas.edu.pe',
      phone:'+51 921323554',
      group_advisor_acronym:'GINSOFT',
      advisor_line_reserach:'Computación'
    },
    {
      id:2,
      first_name:'Bryan',
      last_name:'Pando',
      academic_degree: 'Magister',
      document_number: '21348569',
      email:'bryan.pando@unas.edu.pe',
      phone:'+51 975484562',
      group_advisor_acronym:'GINSOFT',
      advisor_line_reserach:'Construcción de software'
    },
    {
      id:3,
      first_name:'George',
      last_name:'Paucar',
      academic_degree: 'Magister',
      document_number: '65874129',
      email:'george.paucar@unas.edu.pe',
      phone:'+51 984578962',
      group_advisor_acronym:'GISI',
      advisor_line_reserach:'Arquitectura empresarial'
    },
    {
      id:4,
      first_name:'Marco',
      last_name:'Canales',
      academic_degree: 'Magister',
      document_number: '63217854',
      email:'marco.canales@unas.edu.pe',
      phone:'+51 924685686',
      group_advisor_acronym:'GISI',
      advisor_line_reserach:'Gestión de procesos de negocio'
    },
    {
      id:5,
      first_name:'Edwin',
      last_name:'Vega',
      academic_degree: 'Magister',
      document_number: '79654123',
      email:'edwin.vega@unas.edu.pe',
      phone:'+51 914789653',
      group_advisor_acronym:'RESEGTI',
      advisor_line_reserach:'Seguridad de la información'
    },
    {
      id:6,
      first_name:'William',
      last_name:'Marchand',
      academic_degree: 'Doctor',
      document_number: '45016780',
      email:'william.marchand@unas.edu.pe',
      phone:'+51 954878965',
      group_advisor_acronym:'RESEGTI',
      advisor_line_reserach:'Ciberseguridad'
    },
  ];
  export { ListJsGroup, ListJsArea, ListJsLine, ListJsAdvisor};