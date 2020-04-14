import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentRegisterComponent } from './students/student-register/student-register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { StudentService } from './_services/student.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StudentListComponent,
    LoginComponent,
    StudentRegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: StudentRegisterComponent },
      { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },

      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    AlertifyService,
    AuthService,
    StudentService,
    AuthGuard,

    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
