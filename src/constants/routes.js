import LoginUI from "../views/LoginUI.js"
import BillsUI from "../views/BillsUI.js"
import NewBillUI from "../views/NewBillUI.js"
import DashboardUI from "../views/DashboardUI.js"
import RegisterUI from "../views/RegisterUI.js"
import NewDEDUI from "../views/NewDEDUI.js"

export const ROUTES_PATH = {
  Login: '/',
  Bills: '#employee/bills',
  NewBill: '#employee/bill/new',
  NewDED: '#employee/ded/new',
  Dashboard: '#admin/dashboard',
  Register: '#register'
}

export const ROUTES = ({ pathname, data, error, loading }) => {
  switch (pathname) {
    case ROUTES_PATH['Login']:
      return LoginUI({ data, error, loading })
    case ROUTES_PATH['Bills']:
      return BillsUI({ data, error, loading })
    case ROUTES_PATH['NewBill']:
      return NewBillUI()
    case ROUTES_PATH['Dashboard']:
      return DashboardUI({ data, error, loading })
    case ROUTES_PATH['Register']:
      return RegisterUI()
    case ROUTES_PATH['NewDED']:
      return NewDEDUI()
    default:
      return LoginUI({ data, error, loading })
  }
}

