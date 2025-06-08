//import { ChartOptions } from "src/app/store/Crypto/crypto_model";
/**
 * Best Selling
 */
 const BestSelling = [
  {
      image: "assets/images/products/img-1.png",
      pName: 'Branded T-Shirts',
      date: '24 Apr 2021',
      price: '29.00',
      orders: '62',
      stock: '510',
      amount: '1,798',
  },
  {
    image: "assets/images/products/img-2.png",
    pName: 'Bentwood Chair',
    date: '19 Mar 2021',
    price: '85.20',
    orders: '35',
    stock: 'Out of stock',
    amount: '2982',
  },
  {
    image: "assets/images/products/img-3.png",
    pName: 'Borosil Paper Cup',
    date: '01 Mar 2021',
    price: '14.00',
    orders: '80',
    stock: '749',
    amount: '1120',
  },
  {
    image: "assets/images/products/img-4.png",
    pName: 'One Seater Sofa',
    date: '11 Feb 2021',
    price: '127.50',
    orders: '56',
    stock: 'Out of stock',
    amount: '7140',
  },
  {
    image: "assets/images/products/img-5.png",
    pName: 'Stillbird Helmet',
    date: '17 Jan 2021',
    price: '54',
    orders: '74',
    stock: '805',
    amount: '3996',
  }
];

/**
 * Top Selleing
 */
 const TopSelling = [
    {
        image: "assets/images/companies/img-1.png",
        pName: 'iTest Factory',
        subtitle: 'Oliver Tyler',
        type: 'Bags and Wallets',
        stock: '8547',
        amount: '541200',
        percentage: '32',
    },
    {
      image: "assets/images/companies/img-2.png",
      pName: 'Digitech Galaxy',
      subtitle: 'John Roberts',
      type: 'Watches',
      stock: '895',
      amount: '75030',
      percentage: '79',
    },
    {
      image: "assets/images/companies/img-3.png",
      pName: 'Nesta Technologies',
      subtitle: 'Harley Fuller',
      type: 'Bike Accessories',
      stock: '3470',
      amount: '45600',
      percentage: '90',
    },
    {
      image: "assets/images/companies/img-4.png",
      pName: 'Zoetic Fashion',
      subtitle: 'James Bowen',
      type: 'Clothes',
      stock: '5488',
      amount: '29456',
      percentage: '40',
    },
    {
      image: "assets/images/companies/img-5.png",
      pName: 'Meta4Systems',
      subtitle: 'Zoe Dennis',
      type: 'Furniture',
      stock: '4100',
      amount: '11260',
      percentage: '57',
    }
];

/**
 * Recent Selleing
 */
 const Recentelling = [
    {
        id: "#VZ2112",
        image: "assets/images/users/avatar-1.jpg",
        customer: 'Alex Smith',
        product: 'Clothes',
        amount: '109.00',
        vendor: 'Zoetic Fashion',
        status: 'Paid',
        rating: '5.0',
        average: "61"
    },
    {
        id: "#VZ2111",
        image: "assets/images/users/avatar-2.jpg",
        customer: 'Jansh Brown',
        product: 'Kitchen Storage',
        amount: '149.00',
        vendor: 'Micro Design',
        status: 'Pending',
        rating: '4.5',
        average: "61"
    },
    {
        id: "#VZ2109",
        image: "assets/images/users/avatar-3.jpg",
        customer: 'Ayaan Bowen',
        product: 'Bike Accessories',
        amount: '215.00',
        vendor: 'Nesta Technologies',
        status: 'Paid',
        rating: '4.9',
        average: "89"
    },    
    {
        id: "#VZ2108",
        image: "assets/images/users/avatar-4.jpg",
        customer: 'Prezy Mark',
        product: 'Furniture',
        amount: '199.00',
        vendor: 'Syntyce Solutions',
        status: 'Unpaid',
        rating: '4.3',
        average: "47"
    },   
    {
        id: "#VZ2107",
        image: "assets/images/users/avatar-6.jpg",
        customer: 'Vihan Hudda',
        product: 'Bags and Wallets',
        amount: '330.00',
        vendor: 'iTest Factory',
        status: 'Paid',
        rating: '4.7',
        average: "161"
    } 
];

/**
 * Stat Counder Data
 */
const statData = [{
      title: 'TOTAL EARNINGS',
      value: 559.25,
      icon: 'bx-dollar-circle',
      persantage: '16.24',
      profit: 'up',
      link:'View net earnings'
    }, {
        title: 'ORDERS',
        value: 36894,
        icon: 'bx-shopping-bag',
        persantage: '3.57',
        profit: 'down',
        link:'View all orders'
    }, {
        title: 'CUSTOMERS',
        value: 183.35,
        icon: 'bx-user-circle',
        persantage: '29.08',
        profit: 'up',
        link:'See details'
    }, {
        title: 'MY BALANCE',
        value: 165.89,
        icon: 'bx-wallet',
        persantage: '0.00',
        profit: 'equal',
        link:'Withdraw money'
    }
];

/**
 * Stat Counder Data
 */
const analyticstatData = [{
  title: 'Users',
  value: 28.05,
  icon: 'users',
  persantage: '16.24',
  profit: 'up'
}, {
    title: 'Sessions',
    value: 97.66,
    icon: 'activity',
    persantage: '3.96',
    profit: 'down'
}, {
    title: 'Avg. Visit Duration',
    value: 3.40,
    icon: 'clock',
    persantage: '0.24',
    profit: 'down'
}, {
    title: 'Bounce Rate',
    value: 33.48,
    icon: 'external-link',
    persantage: '7.05',
    profit: 'up'
}
];

/**
* Top Selleing
*/
const analyticTopPages = [
  {
      page: "/themesbrand/skote-25867",
      active: '99',
      users: '25.3',
  },
  {
      page: "/dashonic/chat-24518",
      active: '86',
      users: '22.7',
  },
  {
      page: "/skote/timeline-27391",
      active: '64',
      users: '18.7',
  },
  {
      page: "/themesbrand/minia-26441",
      active: '53',
      users: '14.2',
  },
  {
      page: "/dashon/dashboard-29873",
      active: '33',
      users: '12.6',
  },
  {
      page: "/doot/chats-29964",
      active: '20',
      users: '10.9',
  },
  {
      page: "/steex/pages-29739",
      active: '10',
      users: '07.3',
  }
];


export { analyticstatData, analyticTopPages, BestSelling, TopSelling, Recentelling, statData};

