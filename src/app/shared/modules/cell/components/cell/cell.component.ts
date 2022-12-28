import { Component } from '@angular/core';

@Component({
  selector: 'app-cell',
  template: `
    <div class="cell"></div>
  `,
  styles: [`
    .cell {
      width: 70px;
      height: 70px;
      display: inline-block;

      margin-right: 8px;

      background-color: rgba(0, 34, 255, 0.5);

      cursor: pointer;
    }
  `]
})
export class CellComponent { }
