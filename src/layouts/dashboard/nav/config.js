// import SvgColor from '../../../components/svg-color';


// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
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
    title: '2d ',
    path: '/dashboard/products',
    // icon: icon('ic_cart'),
  },
  {
    title: '3d',
    path: '/dashboard/blog',
    // icon: icon('ic_blog'),
  },
  {
    title: 'Calulation',
    path:"/dashboard/calulation"
  },
  {
    title: 'Login',
    path: '/login',
    // icon: icon('ic_lock'),
  },
];

export default navConfig;
