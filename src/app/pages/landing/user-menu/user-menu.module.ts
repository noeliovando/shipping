import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserMenuComponent } from './user-menu.component';
import { UserMenuService } from './user-menu.service';

export const routes = [
    { path: '', component: UserMenuComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        UserMenuService
    ],
    declarations: [
        UserMenuComponent
    ]
})
export class UserMenuModule { }
