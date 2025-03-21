import { screen, fireEvent } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES } from "../constants/routes.js"

/**
 * @jest-environment jsdom
 */


describe("Given I am connected as an employee", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify({ email: "employee@test.com" })),
        setItem: jest.fn(() => null),
      },
      writable: true
    })
  })

  describe("When I am on NewBill Page", () => {
    test("Then the form should be rendered correctly", () => {
      const html = NewBillUI()
      document.body.innerHTML = html

      expect(screen.getByTestId("form-new-bill")).toBeTruthy()
      expect(screen.getByTestId("expense-type")).toBeTruthy()
      expect(screen.getByTestId("expense-name")).toBeTruthy()
      expect(screen.getByTestId("datepicker")).toBeTruthy()
      expect(screen.getByTestId("amount")).toBeTruthy()
      expect(screen.getByTestId("vat")).toBeTruthy()
      expect(screen.getByTestId("pct")).toBeTruthy()
      expect(screen.getByTestId("commentary")).toBeTruthy()
      expect(screen.getByTestId("file")).toBeTruthy()
    })

    test("Then the form submission should work correctly", () => {
      const html = NewBillUI()
      document.body.innerHTML = html

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const newBill = new NewBill({ document, onNavigate, localStorage: window.localStorage })
      const handleSubmit = jest.fn(newBill.handleSubmit)
      const form = screen.getByTestId("form-new-bill")
      form.addEventListener("submit", handleSubmit)
      fireEvent.submit(form)
      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})

/**
 * @jest-environment jsdom
 */


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then the form should be rendered correctly", () => {
      const html = NewBillUI()
      document.body.innerHTML = html

      expect(screen.getByTestId("form-new-bill")).toBeTruthy()
      expect(screen.getByTestId("expense-type")).toBeTruthy()
      expect(screen.getByTestId("expense-name")).toBeTruthy()
      expect(screen.getByTestId("datepicker")).toBeTruthy()
      expect(screen.getByTestId("amount")).toBeTruthy()
      expect(screen.getByTestId("vat")).toBeTruthy()
      expect(screen.getByTestId("pct")).toBeTruthy()
      expect(screen.getByTestId("commentary")).toBeTruthy()
      expect(screen.getByTestId("file")).toBeTruthy()
    })

    test("Then the form submission should work correctly", () => {
      const html = NewBillUI()
      document.body.innerHTML = html

      const newBill = new NewBill({ document, onNavigate: jest.fn(), store: null, localStorage: window.localStorage })

      const handleSubmit = jest.fn(newBill.handleSubmit)
      const form = screen.getByTestId("form-new-bill")
      form.addEventListener("submit", handleSubmit)

      fireEvent.submit(form)

      expect(handleSubmit).toHaveBeenCalled()
    })
  })
})