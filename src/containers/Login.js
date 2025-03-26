import { ROUTES_PATH } from '../constants/routes.js'
export let PREVIOUS_LOCATION = ''

// we use a class so as to test its methods in e2e tests
export default class Login {
  constructor({ document, localStorage, onNavigate, PREVIOUS_LOCATION, store }) {
    this.document = document
    this.localStorage = localStorage
    this.onNavigate = onNavigate
    this.PREVIOUS_LOCATION = PREVIOUS_LOCATION
    this.store = store
    const formEmployee = this.document.querySelector(`form[data-testid="form-employee"]`)
    formEmployee.addEventListener("submit", this.handleSubmitEmployee)
    const formAdmin = this.document.querySelector(`form[data-testid="form-admin"]`)
    formAdmin.addEventListener("submit", this.handleSubmitAdmin)
    const registerButton = this.document.querySelector(`button[data-testid="register-button"]`)
    registerButton.addEventListener("click", this.handleRegisterClick)
  }

  handleSubmitEmployee = e => {
    e.preventDefault()
    const user = {
      type: "Employee",
      email: e.target.querySelector(`input[data-testid="employee-email-input"]`).value,
      password: e.target.querySelector(`input[data-testid="employee-password-input"]`).value,
      status: "connected"
    }
    this.localStorage.setItem("user", JSON.stringify(user))
    this.login(user)
      .then(() => {
        this.onNavigate(ROUTES_PATH['Bills'])
        this.PREVIOUS_LOCATION = ROUTES_PATH['Bills']
        PREVIOUS_LOCATION = this.PREVIOUS_LOCATION
        this.document.body.style.backgroundColor="#fff"
      })
      .catch((err) => {
        this.displayErrorMessage("User does not exist")
      })
  }

  handleSubmitAdmin = e => {
    e.preventDefault()
    const user = {
      type: "Admin",
      email: e.target.querySelector(`input[data-testid="admin-email-input"]`).value,
      password: e.target.querySelector(`input[data-testid="admin-password-input"]`).value,
      status: "connected"
    }
    this.localStorage.setItem("user", JSON.stringify(user))
    this.login(user)
      .then(() => {
        this.onNavigate(ROUTES_PATH['Dashboard'])
        this.PREVIOUS_LOCATION = ROUTES_PATH['Dashboard']
        PREVIOUS_LOCATION = this.PREVIOUS_LOCATION
        document.body.style.backgroundColor="#fff"
      })
      .catch((err) => {
        this.displayErrorMessage("User does not exist")
      })
  }

  handleRegisterClick = () => {
    this.onNavigate(ROUTES_PATH['Register'])
  }

  // not need to cover this function by tests
  login = (user) => {
    if (this.store) {
      return this.store
      .login(JSON.stringify({
        email: user.email,
        password: user.password,
      })).then(({jwt}) => {
        localStorage.setItem('jwt', jwt)
      })
    } else {
      return null
    }
  }

  // not need to cover this function by tests
  createUser = (user) => {
    if (this.store) {
      return this.store
      .users()
      .create({data:JSON.stringify({
        type: user.type,
        name: user.email.split('@')[0],
        email: user.email,
        password: user.password,
      })})
      .then(() => {
        console.log(`User with ${user.email} is created`)
        return this.login(user)
      })
    } else {
      return null
    }
  }

  displayErrorMessage = (message) => {
    // Remove any existing error message
    const existingError = this.document.querySelector('.error-message')
    if (existingError) {
        existingError.remove()
    }

    // Create and display the new error message
    const div = this.document.createElement('div')
    div.className = 'error-message'
    div.innerHTML = message
    div.style.color = 'red'
    div.style.textAlign = 'center'
    div.style.border = '1px solid red'
    div.style.backgroundColor = '#ffe6e6'
    div.style.padding = '10px'
    div.style.marginTop = '5px'
    div.style.borderRadius = '5px'
    this.document.querySelector('body').appendChild(div)
  }
}
