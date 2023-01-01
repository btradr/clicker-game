import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { interval, Observable, Subject, takeUntil, takeWhile } from 'rxjs';

import { CellService } from '../../../shared/services/cell.service';
import { ModalComponent } from '../../../shared/modules/modal/components/modal/modal.component';
import { randomHelper, secondsMultiplierHelper, timeCheckerHelper } from '../../../shared/helpers';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {
	public cells: number[];
	public computerCells: number[];
	public playerCells: number[];
	public time: number = 0;
	public activeCell$: Subject<number> = new Subject<number>();

	private stopInterval: boolean;
	private destroy$: Subject<null> = new Subject<null>();

	public constructor(
		private cellService: CellService,
		private viewContainerRef: ViewContainerRef
	) { }

	public ngOnInit(): void {
		this.initValues();
		this.showModal();
	}

	public ngOnDestroy(): void {
		this.destroy$.next(null);
		this.destroy$.complete();
	}

	public completeGame(): void {
		this.stopInterval = false;

		this.updateValues();
		this.cellService.completeGame();
		this.showModal();

		this.cellService.updateValues();
		this.cellService.createCells();
	}

	private showModal(): void {
		this.viewContainerRef.clear();
		const modal = this.viewContainerRef.createComponent(ModalComponent);
		modal.instance.onClose
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				if (timeCheckerHelper(modal.instance.time)) {
					this.time = modal.instance.time;
					this.start();
				}
			});
	}

	private start(): void {
		this.initValues();
		this.startInterval()
			.subscribe(() => {
				const random = randomHelper(101);
				const candidate = this.cellService.checkIncomingNum(random);

				if (candidate) {
					return;
				}

				this.activeCell$.next(random);
			});

		this.viewContainerRef.clear();
	}

	private startInterval(): Observable<number> {
		return interval(secondsMultiplierHelper(this.time))
			.pipe(
				takeWhile(() => this.stopInterval),
				takeUntil(this.destroy$)
			);
	}

	private updateValues(): void {
		this.cells = [];
		this.playerCells = [];
		this.computerCells = [];
	}

	private initValues(): void {
		this.stopInterval = true;
		this.cells = this.cellService.cells;
		this.playerCells = this.cellService.playerCells;
		this.computerCells = this.cellService.computerCells;
	}
}
