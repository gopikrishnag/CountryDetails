import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from  '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatTableModule,
      MatInputModule,
      MatSelectModule,
      MatCardModule,
    ],
    exports: [
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatTableModule,
      MatInputModule,
      MatSelectModule,
      MatCardModule,
    ]
  })
  export class MaterialModule { }
  