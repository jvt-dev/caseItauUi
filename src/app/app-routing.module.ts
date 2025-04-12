import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundoListComponent } from './components/fundo-list/fundo-list.component';
import { FundoFormComponent } from './components/fundo-form/fundo-form.component';
import { ErrorComponent } from './components/error/error.component';
import { NotImplementedComponent } from './components/not-implemented/not-implemented.component';

const routes: Routes = [
  { path: 'fundos', component: FundoListComponent },
  { path: 'fundos/novo', component: FundoFormComponent },
  { path: 'fundos/editar/:codigo', component: FundoFormComponent },
  { path: 'fundos/detalhes/:codigo', component: FundoFormComponent },
  { path: '', redirectTo: '/fundos', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: 'not-implemented', component: NotImplementedComponent },
  { path: '**', redirectTo: '/not-implemented' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
