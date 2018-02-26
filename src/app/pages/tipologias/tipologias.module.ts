import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TipologiasComponent,
  ModalEliminarTipologia
} from "./tipologias.component";
import { TipologiasRoutingModule } from './tipologias-routing.module';

import { ComunModule } from "./../../common/comun.module";
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarComponent } from './crear-editar/editar.component';
import { CrearComponent } from './crear-editar/crear.component';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    TipologiasRoutingModule,
    ComunModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [
    TipologiasComponent,
    EditarComponent,
    CrearComponent,
    ModalEliminarTipologia,
    TipologiasComponent
  ],
  entryComponents: [ModalEliminarTipologia]
})
export class TipologiasModule {}
