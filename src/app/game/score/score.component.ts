import {Component, Input, OnInit} from '@angular/core';
import {World} from '../world/world';
import {ScoreService} from './score.service';
import {Player} from '../../player/player';

@Component({
  selector: 'gen-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  @Input() world: World;
  @Input() players: Player[];

  public score;
  public maxPoints = 0;

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.score.subscribe(
      (score) => {
        this.score = score;
        this.maxPoints = this.getWinner(score);
      }
    );
    this.scoreService.calculateScore(this.world, this.players);
  }

  getWinner(score) {
    let max = 0;
    for (const player in score) {
      if (score.hasOwnProperty(player)) {
        if (score[player].score > max) {
          max = score[player].score;
        }
      }
    }
    return max;
  }

}
