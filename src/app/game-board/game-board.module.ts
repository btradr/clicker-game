import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { GameBoardComponent } from './components/game-board/game-board.component';

// Services
import { CellService } from '../shared/services/cell.service';

@NgModule({
  declarations: [
    GameBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GameBoardComponent
  ],
  providers: [
    CellService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: CellService) => async () => {
        return service.createCells();
      },
      deps: [CellService],
      multi: true
    }
  ]
})
export class GameBoardModule { }
