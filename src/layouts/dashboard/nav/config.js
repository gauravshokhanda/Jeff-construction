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
  {
    title: 'Calculation',
    path: '/dashboard/Calculation',
  },
];

const navConfig = (userRole) => {
  if (userRole === 'admin') {
    return adminRoleNavConfig;
  }

  if (userRole === 'contractor') {
    return contractorNavConfig;
  }
  return [];
};

export default navConfig;
