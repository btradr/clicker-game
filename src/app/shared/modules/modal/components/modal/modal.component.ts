import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StorageService } from '../../../../services/storage.service';
import { STORAGE_COMPUTER_KEY, STORAGE_PLAYER_KEY } from '../../../../constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() public onClose: EventEmitter<void> = new EventEmitter<void>();

  public playerScore: number;
  public computerScore: number;
  public time: number = 0;

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
