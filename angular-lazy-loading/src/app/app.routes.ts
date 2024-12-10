import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    {
        path: 'lazy', loadChildren: () =>
            import('./loading-lazy/loading-lazy.module').then(m => m.LoadingLazyModule)
    },
    {
        path: 'lazy', loadChildren: () =>
            import('./loading-lazy/loading-lazy.module').then(m => m.LoadingLazyModule)
    }
];
