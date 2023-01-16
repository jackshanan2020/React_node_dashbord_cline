import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import EditUser from './pages/EditUser';
import { ProvideAuth, useAuth } from './hooks/useAuth';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Order from './pages/Order';
import Purchases from './pages/Purchases';
import ListCustomer from './pages/settings/ListCustomer';
import ListBrand from './pages/settings/ListBrand';
import ListCategory from './pages/settings/ListCategory';
import { AddBrand, ApplicationSettings, AddCategory, AddCustomer } from './pages/settings';
import {
  Reports,
  SalesReport,
  PurchaseReport,
  ProductsReport,
  QuantityAlertsReports,
  TopProductsReport,
  ActivityLogs,
  ExpensesReport
} from './pages/reports';
import { InventoryCreateForm } from './sections/@dashboard/inventory';
import AddExpenses from './pages/expenses/AddExpenses';
import Expenses from './pages/expenses/Expenses';
import AddSupplier from './pages/settings/AddSupplier';
import ListSuppliers from './pages/settings/ListSuppliers';

// ----------------------------------------------------------------------

export default function Router() {

  const user = useAuth();
  return useRoutes([
    {
      path: '/dashboard',
      element: <ProvideAuth><DashboardLayout /></ProvideAuth>,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'user/edit-user', element: <EditUser /> },
        { path: 'user/create-user', element: <Register /> },
        { path: 'product', element: <Inventory /> },
        { path: 'product/create', element: <InventoryCreateForm /> },
        { path: 'product/edit', element: <Products /> },
        { path: 'product/purchases', element: <Purchases /> },
        { path: 'order', element: <Order /> },
        { path: 'sales', element: <Order /> },

  
        { path: 'expenses/list-expenses', element: <Expenses /> },
        { path: 'expenses/add-expenses', element: <AddExpenses /> },
        { path: 'settings', element: <ApplicationSettings /> },
        { path: 'settings/list-brand', element: <ListBrand /> },
        { path: 'settings/list-customer', element: <ListCustomer /> },
        { path: 'settings/list-category', element: <ListCategory /> },
        { path: 'settings/add-brand', element: <AddBrand /> },
        { path: 'settings/add-category', element: <AddCategory /> },
        { path: 'settings/add-customer', element: <AddCustomer /> },
        { path: 'settings/add-supplier', element: <AddSupplier/> },
        { path: 'settings/list-suppliers', element: <ListSuppliers /> },
        
        { path: 'reports', element: <Reports /> },
        // { path: 'reports/sales-report', element: <SalesReport /> },
        { path: 'reports/purchases-report', element: <PurchaseReport /> },
        { path: 'reports/product-report', element: <ProductsReport /> },
        { path: 'reports/quantity-alerts', element: <QuantityAlertsReports /> },
        { path: 'reports/top-products', element: <TopProductsReport /> },
        { path: 'reports/activity-logs', element: <ActivityLogs /> },
        { path: 'reports/expenses-report', element: <ExpensesReport /> },


      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
