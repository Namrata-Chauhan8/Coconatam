const GET_BASE_URL = (key: string): string =>
  String(process.env.NEXT_PUBLIC_API_URL) + key;

const endpoints = {
  auth: {
    register: GET_BASE_URL("/auth/register"),
    login: GET_BASE_URL("/auth/login"),
    refresh: GET_BASE_URL("/auth/refresh"),
    logout: GET_BASE_URL("/auth/logout/auth0"),

    // logout: GET_SUPER_ADMIN_BASE_URL(`/auth/logout/auth0?redirect_uri=/v1/auth/login/auth0`),
  },
  user:{
    getProfile: GET_BASE_URL("/auth/profile"),
  }
};
export default endpoints;
