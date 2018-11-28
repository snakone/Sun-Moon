// Material Design Modules
import { NgModule } from '@angular/core';

import { MatButtonModule} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatTabsModule,
            MatTooltipModule, MatProgressSpinnerModule,
            MatStepperModule, MatFormFieldModule, MatInputModule,
            MatSelectModule, MatRadioModule, DragDropModule],

  exports: [MatButtonModule, MatIconModule, MatTabsModule,
            MatTooltipModule, MatProgressSpinnerModule,
            MatStepperModule, MatFormFieldModule, MatInputModule,
            MatSelectModule, MatRadioModule, DragDropModule],
})

export class MaterialModule {}
