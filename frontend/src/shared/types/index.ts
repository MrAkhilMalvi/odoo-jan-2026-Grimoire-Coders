export type UserRole = 'SUPERADMIN' | 'EMPLOYEE' | 'HR';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  employeeName?: string; // For Admin View
  checkIn: string;
  checkOut: string;
  workHours: string;
  extraHours: string;
  status: 'present' | 'late' | 'absent';
}

export type TimeOffType = 'Paid Time Off' | 'Sick Leave' | 'Unpaid Leave';
export type RequestStatus = 'Approved' | 'Rejected' | 'Pending';

export interface TimeOffRequest {
  id: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  type: TimeOffType;
  status: RequestStatus;
  days: number;
}