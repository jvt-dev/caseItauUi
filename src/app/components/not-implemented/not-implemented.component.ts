import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-implemented',
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.css']
})
export class NotImplementedComponent {

  constructor(private router: Router) {}

  voltarParaHome() {
    this.router.navigate(['/']);
  }

}
