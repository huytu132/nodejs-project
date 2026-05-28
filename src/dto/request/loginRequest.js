class LoginRequest {
  constructor({ email, password }) {
    this.email = email?.trim().toLowerCase();
    this.password = password;
  }

  validate() {
    const errors = [];

    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('Email không hợp lệ');
    }

    if (!this.password) {
      errors.push('Password không được để trống');
    }

    return errors;
  }
}

module.exports = LoginRequest;
