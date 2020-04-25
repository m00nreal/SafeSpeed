import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  //@Input() activePage: string;
  activePage: string;

  constructor(
    public authService : AuthService
  ) { }

  ngOnInit(): void {
    
  }

}
