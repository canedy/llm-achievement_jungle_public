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

          <Route path="/goals" page={GoalsPage} name="goals" />
          <Route path="/goal-edit/{id:Int}" page={GoalEditPage} name="goalEdit" />
          <Route path="/goal-create" page={GoalCreatePage} name="goalCreate" />

          <Route path="/results/{id:Int}" page={ResultsPage} name="results" />
          <Route path="/result-edit/{id:Int}/{goalId:Int}" page={ResultEditPage} name="resultEdit" />
          <Route path="/result-create" page={ResultCreatePage} name="resultCreate" />

          <Route path="/actions/{id:Int}" page={ActionsPage} name="actions" />
          <Route path="/actions/{id:Int}/{goalId:Int}" page={ActionsPage} name="actionsToResults" />
          <Route path="/action-edit/{id:Int}/{resultId:Int}" page={ActionEditPage} name="actionEdit" />
          <Route path="/action-create" page={ActionCreatePage} name="actionCreate" />

          <Route path="/chat" page={ChatPage} name="chat" />
          <Route path="/focus-area" page={FocusAreaPage} name="focusArea" />
          <Route path="/contact-us" page={ContactUsPage} name="contactUs" />
        </Set>
      </Private>
      
    </Router>
  )
}

export default Routes
