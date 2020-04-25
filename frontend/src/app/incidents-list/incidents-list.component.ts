import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.css']
})
export class IncidentsListComponent implements OnInit {
  modalId: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

}
