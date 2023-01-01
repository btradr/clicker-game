import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Subject, Subscription, takeUntil, timer } from 'rxjs';

import { CellService } from '../../../../services/cell.service';
import { checkQuantityHelper, secondsMultiplierHelper } from '../../../../helpers';
import { AMOUNT_TO_WIN, GREEN_BACKGROUND, RED_BACKGROUND, YELLOW_BACKGROUND } from '../../../../constants';

@Component({
  selector: 'app-cell',
  template: `
    <div 
      #cellRef
      class="cell" 
      (click)="handleCellClick()"
    ></div>
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
export class CellComponent implements OnInit, OnDestroy {
  @ViewChild('cellRef') public cellRef: ElementRef<HTMLDivElement>;

  @Output() public onEnd: EventEmitter<void> = new EventEmitter<void>();

  @Input() public cellId: number;
  @Input() public time: number = 0;
  @Input() public activeCell$: Subject<number>;

  public computerCells: number[];
  public playerCells: number[];

  private activatedCell: boolean = false;
  private destroy$: Subject<null> = new Subject<null>();

  public constructor(
    private renderer: Renderer2,
    private cellService: CellService
  ) { }

  public ngOnInit(): void {
    this.initValues();
    this.activateCell();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public handleCellClick(): void {
    this.checkForVictory();
    this.activatedCell = true;

    const candidate = this.cellService.checkIncomingNum(this.cellId);
    if (candidate) {
      return;
    }

    this.renderColor(GREEN_BACKGROUND)
    this.cellService.activateCellPlayer(this.cellId);
  }

  private renderColor(color: string): void {
    this.renderer.setStyle(
      this.cellRef.nativeElement,
      'backgroundColor',
      color
    );
  }

  private checkForVictory(): void {
    if (checkQuantityHelper(this.computerCells, AMOUNT_TO_WIN) ||
        checkQuantityHelper(this.playerCells, AMOUNT_TO_WIN)) {
      this.onEnd.emit();
    }
  }

  private countToComputer(): void {
    this.checkForVictory();
    this.cellService.activateCellComputer(this.cellId);
    this.renderColor(RED_BACKGROUND);
  }

  private startTimer(): void {
    timer(secondsMultiplierHelper(this.time))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.activatedCell) {
          this.countToComputer();
        }
      });
    }

  private activateCell(): Subscription {
    return this.activeCell$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cell: number) => {
        if (this.cellId !== cell) {
          return;
        }
        this.startTimer()
        this.renderColor(YELLOW_BACKGROUND);
      })
  }

  private initValues(): void {
    this.playerCells = this.cellService.playerCells;
    this.computerCells = this.cellService.computerCells;
  }
}
