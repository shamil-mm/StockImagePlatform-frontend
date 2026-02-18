
const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[A-Za-z0-9]{8,}$/;

  export const validateLogin = (data: any) => {
  const errors: Record<string, string> = {};

  const email = data.email?.trim();
  const password = data.password?.trim();

  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Enter a valid email address';
  }

   if (!password) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(password)) {
    errors.password =
      'Password must be at least 8 characters';
  }
  return errors;
};


export const validateRegister = (data: any) => {
  const errors: Record<string, string> = {};

  const name = data.name?.trim();
  const phone = data.phone?.trim();
  const email = data.email?.trim();
  const password = data.password;
  const rePassword = data.rePassword;


  if (!name) {
    errors.name = 'Full name is required';
  } else if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  } else if (!nameRegex.test(name)) {
    errors.name = 'Name can contain only letters and spaces';
  }

  
  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(phone)) {
    errors.phone = 'Enter a valid 10-digit mobile number';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Enter a valid email address';
  }

  
  if (!password) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(password)) {
    errors.password =
      'Password must be at least 8 characters';
  }

  
  if (!rePassword) {
    errors.rePassword = 'Confirm password is required';
  } else if (password !== rePassword) {
    errors.rePassword = 'Passwords do not match';
  }

  return errors;
};
