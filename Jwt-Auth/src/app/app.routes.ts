import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminaccesspageComponent } from './componentes/adminaccesspage/adminaccesspage.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { LoginhomepageComponent } from './componentes/loginhomepage/loginhomepage.component';
import { PagenotfoundComponent } from './componentes/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './componentes/register/register.component';

export const routes: Routes = [
    { component: HomeComponent, path: "home", pathMatch: "full" },
    { component: RegisterComponent, path: "register" },
    { component: LoginComponent, path: "login" },
    { component: LoginhomepageComponent, path: "login-home" },
    { component: AdminaccesspageComponent, path: "admin" },
    { path: "", redirectTo: "/home" ,pathMatch:"full"},
    { component: PagenotfoundComponent, path: "**" },
    { path: "error", redirectTo: "**" ,pathMatch:"full"}
];
