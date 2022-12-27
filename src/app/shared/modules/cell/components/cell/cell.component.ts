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

      background-color: #ffffff;

      cursor: pointer ;
    }
  `]
})
export class CellComponent { }
