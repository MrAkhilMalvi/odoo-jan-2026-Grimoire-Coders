export const API_ENDPOINTS = {
  login: {
    login: `/auth/login`,
    signup: `/auth/signup`,
  },
  forgotPassword: {
    forgotPassword: `/forgot-password/verify/email`,
    verifyOTP: `/forgot-password/verifyOTP`,
    resendOTP: `/forgot-password/resendOTP`,
    setPassword: `/forgot-password/update/password`,
  },
  check: {
    checkin: `/checkinout/store/checkin`,
    storeCheckOut: `/checkinout/store/checkout`,
    lastCheckIn: `/checkinout/last/checkin`,
  },
  employee: {
    empList: `/employee/store/new/employee`,
    newEmployee: `/employee/store/new/employee`,
    empProfile: `/employee/employee/profile`,
    empUpdate: `/employee/update/employee/profile`,
    empSalary: `/employee/employee/salary/details`,
  },
};
