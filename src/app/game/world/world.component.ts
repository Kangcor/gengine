import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'gen-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  @Input() world;

  constructor() { }

  ngOnInit() {
  }

}
