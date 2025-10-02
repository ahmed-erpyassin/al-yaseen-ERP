import JournalEntriesComponent from "@/components/admin/employees/journalEntries/JournalEntriesComponent.vue";
import AttendanceSheetComponent from "@/components/admin/employees/attendanceSheet/AttendanceSheetComponent.vue";
import CreateEmployeeComponent from "@/components/admin/employees/employees/CreateEmployeeComponent.vue";
import EmployeesComonent from "@/components/admin/employees/employees/EmployeesComonent.vue";
import CreateEntryComponent from "@/components/admin/employees/journalEntries/CreateEntryComponent.vue";
import LeavesComponent from "@/components/admin/employees/leaves/LeavesComponent.vue";
import CreatePayrollComponent from "@/components/admin/employees/payrollReport/CreatePayrollComponent.vue";
import PayrollReportComponent from "@/components/admin/employees/payrollReport/PayrollReportComponent.vue";
import CreateContractsComponent from "@/components/admin/employees/contracts/CreateContractsComponent.vue";
import ContractsComponent from "@/components/admin/employees/contracts/ContractsComponent.vue";
import AttendanceShiftsComponent from "@/components/admin/employees/attendanceshifts/AttendanceShiftsComponent.vue";

export default [
  {
    path: "employees",
    children: [
      {
        path: "",
        children: [
          {
            path: "",
            component: EmployeesComonent,
            name: "admin.employees",
          },
          {
            path: "create",
            component: CreateEmployeeComponent,
            name: "admin.employees.create",
          },
        ],
      },
      {
        path: "payroll-report",
        children: [
          {
            path: "",
            component: PayrollReportComponent,
            name: "admin.employees.payroll_report",
          },
          {
            path: "create",
            component: CreatePayrollComponent,
            name: "admin.employees.payroll_report.create",
          },
        ],
      },
      {
        path: "attendance-sheet",
        component: AttendanceSheetComponent,
        name: "admin.employees.attendance_sheet",
      },
      {
        path: "leaves",
        component: LeavesComponent,
        name: "admin.employees.leaves",
      },
      {
        path: "journal-entries",
        children: [
          {
            path: "",
            component: JournalEntriesComponent,
            name: "admin.employees.journal_entries",
          },
          {
            path: "create",
            component: CreateEntryComponent,
            name: "admin.employees.journal_entries.create",
          },
        ],
      },
      {
        path: "contracts",
        children: [
          {
            path: "",
            component: ContractsComponent,
            name: "admin.employees.contracts",
          },
          {
            path: "create",
            component: CreateContractsComponent,
            name: "admin.employees.contracts.create",
          },
        ],
      },
      {
        path: "attendanceshifts",
        children: [
          {
            path: "",
            component: AttendanceShiftsComponent,
            name: "admin.employees.attendanceshifts",
          }
        ],
      },
    ],
  },
];
