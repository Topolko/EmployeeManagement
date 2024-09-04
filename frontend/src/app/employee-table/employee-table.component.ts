import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(data);
    })
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees.filter(e => e.id !== id)
      },
      error: (err) => {
        console.error('Error deletong employee', err)
      }
    });
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
    this.employeeService.getEmployeeById(id).subscribe({
      next: () => {
        this.employees.filter(e => e.id !== id)
      },
      error: (err) => {
        console.error('Error deletong employee', err)
      }
    });
  }
}
