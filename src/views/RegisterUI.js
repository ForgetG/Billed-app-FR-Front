const RegisterUI = () => {
  return `
    <div class="register-container">
      <form data-testid="form-register">
        <h1>Register</h1>
        <div>
          <label for="email">Email</label>
          <input type="email" data-testid="register-email-input" id="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" data-testid="register-password-input" id="password" required />
        </div>
        <div>
          <label for="confirm-password">Confirm Password</label>
          <input type="password" data-testid="register-confirm-password-input" id="confirm-password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  `;
};

export default RegisterUI;