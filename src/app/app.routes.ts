import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { CharactersDetailsPage } from './characters-details/characters-details.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'characters-details/:id',
    component: CharactersDetailsPage
  },
];
