// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Router, Route, Set } from '@redwoodjs/router'
import DashboardLayout from 'src/layouts/DashboardLayout/DashboardLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/signin" page={SigninPage} name="signin" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />

      
        <Private unauthenticated="home">
        <Set wrap={DashboardLayout}>
          <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        </Set>
      </Private>
      
    </Router>
  )
}

export default Routes
