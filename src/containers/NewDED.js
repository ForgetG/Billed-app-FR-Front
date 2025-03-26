import { ROUTES_PATH } from '../constants/routes.js'
import Logout from "./Logout.js"

export default class NewDED {
  constructor({ document, onNavigate, store, localStorage }) {
    this.document = document
    this.onNavigate = onNavigate
    this.store = store
    const formNewDED = this.document.querySelector(`form[data-testid="form-new-ded"]`)
    formNewDED.addEventListener("submit", this.handleSubmit)
    const file = this.document.querySelector(`input[data-testid="file"]`)
    file.addEventListener("change", this.handleChangeFile)
    this.fileUrl = null
    this.fileName = null
    this.dedId = null
    new Logout({ document, localStorage, onNavigate })
  }

  handleChangeFile = e => {
    e.preventDefault()
    const file = this.document.querySelector(`input[data-testid="file"]`).files[0]
    const filePath = e.target.value.split(/\\/g)
    const fileName = filePath[filePath.length-1]
    const fileExtension = fileName.split('.').pop().toLowerCase()

    // Validate file extension
    const validExtensions = ['jpg', 'jpeg', 'png']
    if (!validExtensions.includes(fileExtension)) {
      alert('Only jpg, jpeg, or png files are allowed.')
      this.document.querySelector(`input[data-testid="file"]`).value = ''
      return
    }

    const formData = new FormData()
    const email = JSON.parse(localStorage.getItem("user")).email
    formData.append('file', file)
    formData.append('email', email)

    this.store
      .deds()
      .create({
        data: formData,
        headers: {
          noContentType: true
        }
      })
      .then(({fileUrl, key}) => {
        console.log(fileUrl)
        this.dedId = key
        this.fileUrl = fileUrl
        this.fileName = fileName
      }).catch(error => console.error(error))
  }

  handleSubmit = e => {
    e.preventDefault()
    const email = JSON.parse(localStorage.getItem("user")).email
    const ded = {
      email,
      type: e.target.querySelector(`select[data-testid="expense-type"]`).value,
      name:  e.target.querySelector(`input[data-testid="expense-name"]`).value,
      amount: parseInt(e.target.querySelector(`input[data-testid="amount"]`).value),
      date:  e.target.querySelector(`input[data-testid="datepicker"]`).value,
      vat: e.target.querySelector(`input[data-testid="vat"]`).value,
      pct: parseInt(e.target.querySelector(`input[data-testid="pct"]`).value) || 20,
      commentary: e.target.querySelector(`textarea[data-testid="commentary"]`).value,
      fileUrl: this.fileUrl,
      fileName: this.fileName,
      status: 'pending'
    }
    this.updateDED(ded)
    this.onNavigate(ROUTES_PATH['Bills'])
  }

  // not need to cover this function by tests
  updateDED = (ded) => {
    if (this.store) {
      this.store
      .deds()
      .update({data: JSON.stringify(ded), selector: this.dedId})
      .then(() => {
        this.onNavigate(ROUTES_PATH['Bills'])
      })
      .catch(error => console.error(error))
    }
  }
}
