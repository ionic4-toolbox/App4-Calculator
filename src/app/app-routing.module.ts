import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'add-event', loadChildren: './pages/add-event/add-event.module#AddEventPageModule' },
  { path: 'edit-event', loadChildren: './pages/edit-event/edit-event.module#EditEventPageModule' },
  { path: 'template', loadChildren: './pages/template/template.module#TEMPLATEPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
