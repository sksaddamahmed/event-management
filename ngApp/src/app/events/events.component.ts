import { Component, OnInit } from '@angular/core';
import {EventService} from "../event.service"

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = []
  constructor(private _event : EventService) { }

  ngOnInit() {
    this._event.getEvents().subscribe(
      resp => this.events = resp,
      err => console.log(err)
    )
  }

}
