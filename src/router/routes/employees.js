import JournalEntriesComponent from "@/components/admin/employees/journalEntries/JournalEntriesComponent.vue";
import AttendanceSheetComponent from "@/components/admin/employees/attendanceSheet/AttendanceSheetComponent.vue";
import CreateEmployeeComponent from "@/components/admin/employees/employees/EditEmployeeComponent.vue";
import ShowEmployeeComponent from "@/components/admin/employees/employees/ShowEmployeeComponent.vue";
import EmployeesComonent from "@/components/admin/employees/employees/EmployeesComonent.vue";
import EditEmployeeComponent from "@/components/admin/employees/employees/EditEmployeeComponent.vue";
import CreateEntryComponent from "@/components/admin/employees/journalEntries/CreateEntryComponent.vue";
import LeavesComponent from "@/components/admin/employees/leaves/LeavesComponent.vue";
import CreatePayrollComponent from "@/components/admin/employees/payrollReport/CreatePayrollComponent.vue";
import PayrollReportComponent from "@/components/admin/employees/payrollReport/PayrollReportComponent.vue";
import CreateContractsComponent from "@/components/admin/employees/contracts/CreateContractsComponent.vue";
import ContractsComponent from "@/components/admin/employees/contracts/ContractsComponent.vue";
import AttendanceShiftsComponent from "@/components/admin/employees/attendanceshifts/AttendanceShiftsComponent.vue";
import LoansComponent from "@/components/admin/employees/loans/LoansComponent.vue";
import PromotionsAndEvaluationsComponent from "@/components/admin/employees/promotionsandevaluations/PromotionsAndEvaluationsComponent.vue";
import EmployeeDocumentsComponent from "@/components/admin/employees/employeedocuments/EmployeeDocumentsComponent.vue";
import ReportsComponent from "@/components/admin/employees/reports/ReportsComponent.vue";
import SettingsComponent from "@/components/admin/employees/Settings/SettingsComponent.vue";

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
          {
            path: "/admin/employees/:id/edit",
            component: EditEmployeeComponent,
            name: "admin.employees.edit",
            props: true,
          },
          {
            path: "/admin/employees/:id",
            component: ShowEmployeeComponent,
            name: "admin.employees.show",
            props: true,
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
            name: "admin.employees.attendance-shifts",
          },
        ],
      },
      {
        path: "Loans",
        children: [
          {
            path: "",
            component: LoansComponent,
            name: "admin.employees.loans",
          },
        ],
      },
      {
        path: "promotions-and-evaluations",
        children: [
          {
            path: "",
            component: PromotionsAndEvaluationsComponent,
            name: "admin.employees.promotions-evaluations",
          },
        ],
      },
      {
        path: "employee-documents",
        children: [
          {
            path: "",
            component: EmployeeDocumentsComponent,
            name: "admin.employees.employee-documents",
          },
        ],
      },
      {
        path: "reports",
        children: [
          {
            path: "",
            component: ReportsComponent,
            name: "admin.employees.reports",
          },
        ],
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            component: SettingsComponent,
            name: "admin.employees.settings",
          },
        ],
      },
    ],
  },
];
