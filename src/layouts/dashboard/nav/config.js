// 
const contractorNavConfig = [
  {
    title: 'Search Address',
    path: '/dashboard/app',
    // icon: icon('ic_analytics'),
  },
  {
    title: 'Maps',
    path: '/dashboard/user',
    // icon: icon('ic_user'),
  },
  {
    title: '2D',
    path: '/dashboard/TwoD',
    // icon: icon('ic_cart'),
  },
  {
    title: '3D',
    path: '/dashboard/ThreeD',
  },
  {
    title: 'Calculation',
    path: '/dashboard/Calculation',
  },
];

const adminRoleNavConfig = [
  {
    title: 'Users',
    path: '/dashboard/Users',
  },
  {
    title:'contractors',
    path:'/dashboard/contractors',
  },
  {
    title:'floorplan',
    path:'/dashboard/floorplan',
  },
  {
    title:'e-state',
    path:'/dashboard/e-state',
  },
];
const userNavConfig=[
  {
    title: 'Calculator',
    path: '/dashboard/Calculator',
  },
]

const navConfig = (userRole) => {
  if (userRole === 'admin') {
    return adminRoleNavConfig;
  }

  if (userRole === 'contractor') {
    return contractorNavConfig;
  }
  if (userRole === 'user') {
    return userNavConfig;
  }
  return [];
};

export default navConfig;
