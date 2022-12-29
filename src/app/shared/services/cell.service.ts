import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { StorageService } from './storage.service';


const STORAGE_PLAYER_KEY: string = 'playerScore';
const STORAGE_COMPUTER_KEY: string = 'computerScore';

@Injectable()
export class CellService {
	public get cells(): number[] {
		return this._cells;
	}

	public get computerCells(): number[] {
		return this._computerCells;
	}

	public get playerCells(): number [] {
		return this._playerCells;
	}

	private _cells: number[] = [];
	private _computerCells: number[] = [];
	private _playerCells: number[] = [];

	public constructor(
		private storageService: StorageService
	) { }

	public activateCellPlayer(serialNumber: number): void {
		this._playerCells.push(serialNumber);
	}

	public activateCellComputer(serialNumber: number): void {
		this._computerCells.push(serialNumber);
	}

	public updateValues(): void {
		this._cells = [];
		this._playerCells = [];
		this._computerCells = [];
	}

	public checkIncomingNum(serialNumber: number): number | void {
		const playerCandidate = this._playerCells.find((cell: number) => cell === serialNumber);
		const computerCandidate = this._computerCells.find((cell: number) => cell === serialNumber);

		return playerCandidate || computerCandidate;
	}

	public completeGame(): void {
		this.storageService.set(STORAGE_PLAYER_KEY, this._playerCells.length)
		this.storageService.set(STORAGE_COMPUTER_KEY, this._computerCells.length)
	}

	public createCells(): Promise<null | void> {
		for (let i = 1; i < 101; i++) {
			this._cells.push(i)
		}

		return of(null).toPromise();
	}
}
