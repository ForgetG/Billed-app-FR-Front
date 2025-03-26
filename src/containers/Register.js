import { ROUTES_PATH } from '../constants/routes.js'

export default class Register {
  constructor({ document, localStorage, onNavigate, store }) {
    this.document = document
    this.localStorage = localStorage
    this.onNavigate = onNavigate
    this.store = store
    const formRegister = this.document.querySelector(`form[data-testid="form-register"]`)
    formRegister.addEventListener("submit", this.handleSubmitRegister)
  }

  handleSubmitRegister = e => {
    e.preventDefault()
    const email = e.target.querySelector(`input[data-testid="register-email-input"]`).value
    const password = e.target.querySelector(`input[data-testid="register-password-input"]`).value
    const confirmPassword = e.target.querySelector(`input[data-testid="register-confirm-password-input"]`).value

    if (password !== confirmPassword) {
      this.displayErrorMessage("Passwords do not match")
      return
    }

    const user = {
      type: "Employee",
      email: email,
      password: password,
      status: "connected"
    }

    this.createUser(user)
      .then(() => {
        this.onNavigate(ROUTES_PATH['Login'])
        this.document.body.style.backgroundColor = "#fff"
      })
      .catch((err) => {
        this.displayErrorMessage("Registration failed")
      })
  }

  createUser = (user) => {
    if (this.store) {
      return this.store
        .users()
        .create({ data: JSON.stringify({
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

  login = (user) => {
    if (this.store) {
      return this.store
        .login(JSON.stringify({
          email: user.email,
          password: user.password,
        })).then(({ jwt }) => {
          localStorage.setItem('jwt', jwt)
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
