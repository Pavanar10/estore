import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RattingsComponent } from './components/rattings/rattings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [RattingsComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports:[RattingsComponent]
})
export class SharedModule {}
