export const signupUser = async (formData) => {
    return fetch('https://api.escuelajs.co/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  };
  
export const loginUser = async (email, password) => {
    return fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  };
  
  export const getUserProfile = async (token) => {
    return fetch('https://api.escuelajs.co/api/v1/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
   