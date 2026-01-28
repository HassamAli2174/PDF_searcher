import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export interface UserRecord {
  loginid: string;
  username: string;
  emailid: string;
  contactno: string;
  userstatus: 'ACTIVE' | 'INACTIVE';
  usercat: 'ADMIN' | 'USER';
}

@Component({
  selector: 'app-inquiry-records',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './inquiry-records.component.html',
  styleUrls: ['./inquiry-records.component.scss']
})
export class InquiryRecordsComponent implements OnInit {

  searchQuery = '';
  activeTab = 'all';

  tabs = [
    { key: 'all', label: 'All' },
    // { key: 'ACTIVE', label: 'Active' },
    // { key: 'INACTIVE', label: 'Inactive' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'SUBMITTED', label: 'Submitted' },
    { key: 'APPROVED', label: 'Approved' },
    // { key: 'REJECTED', label: 'Rejected' }
  ];

  allUsers: UserRecord[] = [];
  filteredUsers: UserRecord[] = [];

  currentPage = 1;
  itemsPerPage = 10;

  sortColumn: keyof UserRecord | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // 🔹 Replace with API later
    this.allUsers = [
      {
        loginid: 'admin',
        username: 'System Admin',
        emailid: 'admin@mail.com',
        contactno: '03001234567',
        userstatus: 'ACTIVE',
        usercat: 'ADMIN'
      },
      {
        loginid: 'user1',
        username: 'John Doe',
        emailid: 'john@mail.com',
        contactno: '03111234567',
        userstatus: 'INACTIVE',
        usercat: 'USER'
      }
    ];

    this.applyFilters();
  }

  applyFilters(): void {
    const q = this.searchQuery.toLowerCase();

    this.filteredUsers = this.allUsers.filter(u => {
      const matchesSearch =
        u.loginid.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.emailid.toLowerCase().includes(q);

      const matchesTab =
        this.activeTab === 'all' || u.userstatus === this.activeTab;

      return matchesSearch && matchesTab;
    });

    this.sortData();
    this.currentPage = 1;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  sortBy(column: keyof UserRecord): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortData();
  }

  sortData(): void {
    if (!this.sortColumn) return;

    this.filteredUsers.sort((a, b) => {
      const valA = a[this.sortColumn!];
      const valB = b[this.sortColumn!];
      return this.sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get pagedUsers(): UserRecord[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  viewUser(user: UserRecord): void {
    console.log('View user:', user);
    // later → route to user details / edit page
  }

  trackByLoginId(_: number, user: UserRecord): string {
    return user.loginid;
  }
}
