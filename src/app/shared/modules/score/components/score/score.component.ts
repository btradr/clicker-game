import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  template: `
    <div class="score">
      <p class="score__count">Player score: <b>{{ scorePlayer }}</b></p>
      <p class="score__count">Computer score: <b>{{ scoreComputer }}</b></p>
    </div>
  `,
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  @Input() public scorePlayer: number = 0;
  @Input() public scoreComputer: number = 0;
}
