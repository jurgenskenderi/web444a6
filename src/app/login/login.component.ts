import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { userName: '', password: '', _id: '' };
  warning: String = '';
  loading: Boolean = false;

  onSubmit(): void {
    if (this.user.userName != '' && this.user.password != '') {
      this.loading = true;
      this.auth.login(this.user).subscribe(
        (res) => {
          this.loading = false;
          localStorage.setItem('access_token', res.token);
          this.route.navigate(['/newReleases']);
        },
        (err) => {
          this.loading = false;
          this.warning = err.error.message;
        }
      );
    }
  }

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit(): void {}
}
