import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';

import { CellService } from '../../../shared/services/cell.service';
import { ModalComponent } from '../../../shared/modules/modal/components/modal/modal.component';

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

	private destroy$: Subject<null> = new Subject<null>();

	public constructor(
		private cellService: CellService,
		private viewContainerRef: ViewContainerRef
	) { }

	public ngOnInit(): void {
		this.initValues();
		this.showModal();
	}

	public ngOnDestroy() {
		this.destroy$.next(null);
		this.destroy$.complete();
	}

	public completeGame(): void {
		this.cells = [];
		this.playerCells = [];
		this.computerCells = [];

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
				if (modal.instance.time < 0.1) {
					return;
				}
				this.time = modal.instance.time;
				this.initValues();
				this.start();
				this.viewContainerRef.clear();
			});
	}

	private start(): Subscription {
		return interval(this.time * 1000)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				const random = Math.floor(Math.random() * 101);
				const candidate = this.cellService.checkIncomingNum(random);

				if (candidate) {
					return;
				}

				this.activeCell$.next(random);
			});
	}

	private initValues(): void {
		this.cells = this.cellService.cells;
		this.playerCells = this.cellService.playerCells;
		this.computerCells = this.cellService.computerCells;
	}
}
