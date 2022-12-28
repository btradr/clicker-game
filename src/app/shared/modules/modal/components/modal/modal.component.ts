import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StorageService } from '../../../../services/storage.service';


const STORAGE_PLAYER_KEY: string = 'playerScore';
const STORAGE_COMPUTER_KEY: string = 'computerScore';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() public onClose: EventEmitter<void> = new EventEmitter<void>();

  public playerScore: number = 0;
  public computerScore: number = 0;

  public constructor(
    private storageService: StorageService
  ) { }

  public ngOnInit(): void {
    this.playerScore = this.storageService.get(STORAGE_PLAYER_KEY);
    this.computerScore = this.storageService.get(STORAGE_COMPUTER_KEY);
  }

  public onStart(): void {
    this.onClose.emit();
  }
}
