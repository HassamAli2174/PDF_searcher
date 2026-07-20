import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule, } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule],
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    this.productForm = this.fb.group({
      productcode: [''],
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.apiService.addProduct(this.productForm.value.productcode).subscribe({
        next: res => console.log(res),
        error: err => console.error(err)
      });

      console.log('Product Data:', this.productForm.value);
      // Call your backend API here to save the user
      // e.g., this.userService.createUser(this.userForm.value).subscribe(...)
    }
  }
}