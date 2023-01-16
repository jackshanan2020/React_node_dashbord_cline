// mui
import InventoryIcon from '@mui/icons-material/Inventory';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import PieChartIcon from '@mui/icons-material/PieChart';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
// component
import IconifyMaterialIcon from '../../components/IconifyMaterialIcon';


// ----------------------------------------------------------------------

const getIcon = (name) => <IconifyMaterialIcon icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(DashboardCustomizeRoundedIcon),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(PeopleAltRoundedIcon),
  },
  {
    title: 'product',
    path: '/dashboard/product',
    icon: getIcon(Inventory2RoundedIcon),
    hasChildren:true,
    children:[
      {
        title: 'list products',
        path: '/dashboard/product/',
        icon: getIcon('eva:box-fill'),
      },
       {
        title: 'add product',
        path: '/dashboard/product/create',
        icon: getIcon('eva:box-fill'),
      },
     /* {
        title: 'Purchases',
        path: '/dashboard/product/purchases',
        icon: getIcon('eva:cog-fill'),
      }, */
    ]
  }
  ,
 /* {
    title: 'sales',
    path: '/dashboard/sales',
    icon: getIcon(ReceiptRoundedIcon),
  }, */
  
  {
    title: 'orders',
    path: '/dashboard/order',
    icon: getIcon(ReceiptRoundedIcon),
  },
  {
    title: 'settings',
    path: '/dashboard/settings',
    icon: getIcon(SettingsRoundedIcon),
    hasChildren:true,
    children:[
      {
        title: 'application settings',
        path: '/dashboard/settings/',
        icon: getIcon('eva:file-fill'),
      },
      {
        title: 'add brand',
        path: '/dashboard/settings/add-brand',
        icon: getIcon('eva:cog-fill'),
      },
      {
        title: 'list brand',
        path: '/dashboard/settings/list-brand',
        icon: getIcon('eva:file-fill'),
      },

      {
        title: 'add category',
        path: '/dashboard/settings/add-category',
        icon: getIcon('eva:file-fill'),
      },
      {
        title: 'list category',
        path: '/dashboard/settings/list-category',
        icon: getIcon('eva:file-fill'),
      }
      /* {
        title: 'add customer',
        path: '/dashboard/settings/add-customer',
        icon: getIcon('eva:file-fill'),
      },
      {
        title: 'list customer',
        path: '/dashboard/settings/list-customer',
        icon: getIcon('eva:file-fill'),
      } */,{
        title: 'add supplier',
        path: '/dashboard/settings/add-supplier',
        icon: getIcon('eva:file-fill'),
      },
      {
        title: 'list suppliers',
        path: '/dashboard/settings/list-suppliers',
        icon: getIcon('eva:file-fill'),
      },
    ]
  },
  /* {
    title: 'Expenses',
    icon: getIcon(BoltIcon),
    path: '/dashboard/expenses',
    children:[
      {
        title: 'list expenses',
        path: '/dashboard/expenses/list-expenses',
        icon: getIcon('eva:file-fill'),
      },
      {
        title: 'add expenses',
        path: '/dashboard/expenses/add-expenses',
        icon: getIcon('eva:file-fill'),
      }
     
    ]
  } */
  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: getIcon(AssessmentRoundedIcon),
    hasChildren:true,
    children:[
      {
        title: 'reports',
        path: '/dashboard/reports/',
        icon: getIcon('eva:file-fill'),
      },
      {
        title: 'quantity alerts',
        path: '/dashboard/reports/quantity-alerts',
        icon: getIcon('eva:cog-fill'),
      },
      {
        title: 'products report',
        path: '/dashboard/reports/product-report',
        icon: getIcon('eva:cog-fill'),
      },
      {
        title: 'top products report',
        path: '/dashboard/reports/top-products',
        icon: getIcon('eva:cog-fill'),
      },
      {
        title: 'sales report',
        path: '/dashboard/reports/sales-report',
        icon: getIcon('eva:currency-fill'),
      },
    /*  {
        title: 'purchases report',
        path: '/dashboard/reports/purchases-report',
        icon: getIcon('eva:cog-fill'),
      },
     {
        title: 'expenses report',
        path: '/dashboard/reports/expenses-report',
        icon: getIcon('eva:cog-fill'),
      },
      {
        title: 'activity log',
        path: '/dashboard/reports/activity-logs',
        icon: getIcon('eva:cog-fill'),
      }, */

    ]
  }
 
 

  
];


export default navConfig;
