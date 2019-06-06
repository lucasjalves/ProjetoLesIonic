import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModules } from '../modules/shared-modules.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModules,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ],
    )
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
