import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './components/modal/modal.component';
import { StorageService } from '../../services/storage.service';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule],
  exports: [ModalComponent],
  providers: [StorageService]
})
export class ModalModule { }
