import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NopagefoundComponent} from './shared/nopagefound/nopagefound.component';
import {RegisterComponent} from './login/register.component';
import {PagesRoutingModule} from './pages/pages-routing.module';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true}), PagesRoutingModule],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
