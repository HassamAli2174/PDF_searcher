import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [MatFormField, MatLabel, ReactiveFormsModule, CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    this.userForm = this.fb.group({
      loginid: ['' ],
      password: ['' ],
      userstatus: ['ACTIVE' ],
      username: ['' ],
      contactno: [''],
      emailid: [''],
      mailingaddress: [''],
      changepassword: [false],
      employeeid: [''],
      usercat: ['USER' ],
      appuserid: [loggedInUserId]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
      // Call your backend API here to save the user
      // e.g., this.userService.createUser(this.userForm.value).subscribe(...)
    }
  }
}