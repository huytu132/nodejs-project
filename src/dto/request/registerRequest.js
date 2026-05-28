class RegisterRequest {
  constructor({ username, email, password }) {
    this.username = username?.trim();
    this.email = email?.trim().toLowerCase();
    this.password = password;
  }

  validate() {
    const errors = [];

    if (!this.username || this.username.length < 3) {
      errors.push('Username phải có ít nhất 3 ký tự');
    }

    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('Email không hợp lệ');
    }

    if (!this.password || this.password.length < 6) {
      errors.push('Password phải có ít nhất 6 ký tự');
    }

    return errors;
  }
}

module.exports = RegisterRequest;
