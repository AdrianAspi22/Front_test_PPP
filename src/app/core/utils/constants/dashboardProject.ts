//import { ChartOptions } from "src/app/store/Crypto/crypto_model";

/**
 * Stat Counder Data
 */
 const projectstatData = [{
    title: 'ASESORADOS ACTIVOS',
    value: 825,
    icon: 'briefcase',
    persantage: '5.02',
    profit: 'down',
    month: 'Projects'
  }, {
    title: 'NUEVOS ASESORADOS',
    value: 7522,
    icon: 'award',
    persantage: '3.58',
    profit: 'up',
    month: 'Leads'
  }, {
    title: 'TOTAL HORAS ASESORADAS',
    value: 168.40,
    icon: 'clock',
    persantage: '10.35 ',
    profit: 'down',
    month: 'Work'
  }
];

/**
 * Active Projects
 */
 const ActiveProjects = [
  {
    Pname: "Brand Logo Design",
    profile: 'assets/images/users/avatar-4.jpg',
    Uname: 'Donald Risher',
    progress: 53,
    assignee: [
        {
          profile: 'assets/images/users/avatar-6.jpg'
        },
      ],
    status: 'Progress',
    date: '06 Jun 2024'
  },
  {
    Pname: "Redesign - Landing Page",
    profile: 'assets/images/users/avatar-2.jpg',
    Uname: 'Prezy William',
    progress: 0,
    assignee: [
        {
          profile: 'assets/images/users/avatar-5.jpg'
        },
        {
          profile: 'assets/images/users/avatar-6.jpg'
        }
      ],
    status: 'Pending',
    date: '13 Mar 2024'
  },
  {
    Pname: "Multipurpose Landing Template",
    profile: 'assets/images/users/avatar-3.jpg',
    Uname: 'Boonie Hoynas',
    progress: 100,
    assignee: [
        {
          profile: 'assets/images/users/avatar-7.jpg'
        }
      ],
    status: 'Completed',
    date: '26 Feb 2024'
  },
  {
    Pname: "Chat Application",
    profile: 'assets/images/users/avatar-5.jpg',
    Uname: 'Pauline Moll',
    progress: 64,
    assignee: [
        {
          profile: 'assets/images/users/avatar-2.jpg'
        }
      ],
    status: 'Progress',
    date: '15 Dec 2021'
  },
  {
    Pname: "Create Wireframe",
    profile: 'assets/images/users/avatar-6.jpg',
    Uname: 'James Bangs',
    progress: 77,
    assignee: [
        {
          profile: 'assets/images/users/avatar-1.jpg'
        }
      ],
    status: 'Progress',
    date: '21 Ene 2024'
  }
];

/**
 * My Task
 */
 const MyTask = [
  {
    name: "Create new Admin Template",
    dedline: '03 Nov 2021',
    status: 'Completed',
    assignee: 
    {
      name: 'Mary Stoner',
      profile: 'assets/images/users/avatar-2.jpg'
    }
  },
  {
    name: "Marketing Coordinator",
    dedline: '17 Nov 2021',
    status: 'Progress',
    assignee: 
    {
      name: 'Den Davis',
      profile: 'assets/images/users/avatar-7.jpg'
    }
  },
  {
    name: "Administrative Analyst",
    dedline: '26 Nov 2021',
    status: 'Completed',
    assignee: 
    {
      name: 'Alex Brown',
      profile: 'assets/images/users/avatar-6.jpg'
    }
  },
  {
    name: "E-commerce Landing Page",
    dedline: '10 Dec 2021',
    status: 'Pending',
    assignee: 
    {
      name: 'Prezy Morin',
      profile: 'assets/images/users/avatar-5.jpg'
    }
  },
  {
    name: "UI/UX Design",
    dedline: '22 Dec 2021',
    status: 'Progress',
    assignee: 
    {
      name: 'Stine Nielsen',
      profile: 'assets/images/users/avatar-1.jpg'
    }
  },
  {
    name: "Projects Design",
    dedline: '31 Dec 2021',
    status: 'Pending',
    assignee: 
    {
      name: 'Jansh William',
      profile: 'assets/images/users/avatar-4.jpg'
    }
  }
  
];

/**
 * Team Members
 */
 const TeamMembers = [
  {
    name: "Create new Admin Template",
    dedline: '03 Nov 2021',
    status: 'Completed',
    assignee: 
    {
      name: 'Mary Stoner',
      profile: 'assets/images/users/avatar-2.jpg'
    }
  },
  {
    name: "Marketing Coordinator",
    dedline: '17 Nov 2021',
    status: 'Progress',
    assignee: 
    {
      name: 'Den Davis',
      profile: 'assets/images/users/avatar-7.jpg'
    }
  },
  {
    name: "Administrative Analyst",
    dedline: '26 Nov 2021',
    status: 'Completed',
    assignee: 
    {
      name: 'Alex Brown',
      profile: 'assets/images/users/avatar-6.jpg'
    }
  },
  {
    name: "E-commerce Landing Page",
    dedline: '10 Dec 2021',
    status: 'Pending',
    assignee: 
    {
      name: 'Prezy Morin',
      profile: 'assets/images/users/avatar-5.jpg'
    }
  },
  {
    name: "UI/UX Design",
    dedline: '22 Dec 2021',
    status: 'Progress',
    assignee: 
    {
      name: 'Stine Nielsen',
      profile: 'assets/images/users/avatar-1.jpg'
    }
  },
  {
    name: "Projects Design",
    dedline: '31 Dec 2021',
    status: 'Pending',
    assignee: 
    {
      name: 'Jansh William',
      profile: 'assets/images/users/avatar-4.jpg'
    }
  }
];

export { projectstatData, ActiveProjects, MyTask, TeamMembers };