import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from './components/modal/modal.component';
import { StorageService } from '../../services/storage.service';

@NgModule({
	declarations: [ModalComponent],
	imports: [CommonModule, FormsModule],
	exports: [ModalComponent],
	providers: [StorageService]
})
export class ModalModule { }
