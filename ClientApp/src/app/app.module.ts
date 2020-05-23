import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EnteringSettingsComponent } from './exercises/entering/entering-settings/entering-settings.component';
import { EnteringTestComponent } from './exercises/entering/entering-test/entering-test.component';
import { ExercisesListComponent } from './exercises/exercises-list/exercises-list.component';
import { ExercisesResultComponent } from './exercises/exercises-result/exercises-result.component';
import { PointingSettingsComponent } from './exercises/pointing/pointing-settings/pointing-settings.component';
import { PointingTestComponent } from './exercises/pointing/pointing-test/pointing-test.component';
import { SlideringSettingsComponent } from './exercises/slidering/slidering-settings/slidering-settings.component';
import { SlideringTestComponent } from './exercises/slidering/slidering-test/slidering-test.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentRegisterComponent } from './students/student-register/student-register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { EnteringService } from './_services/entering.service';
import { PointingService } from './_services/pointing.service';
import { SlideringService } from './_services/slidering.service';
import { StudentService } from './_services/student.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StudentListComponent,
    StudentRegisterComponent,
    LoginComponent,
    ExercisesListComponent,
    ExercisesResultComponent,
    EnteringSettingsComponent,
    EnteringTestComponent,
    PointingSettingsComponent,
    PointingTestComponent,
    SlideringSettingsComponent,
    SlideringTestComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: StudentRegisterComponent },
      { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
      { path: 'zadania', component: ExercisesListComponent },
      { path: 'wyniki', component: ExercisesResultComponent },
      { path: 'zadania/wprowadzanie/ustawienia', component: EnteringSettingsComponent },
      { path: 'zadania/wprowadzanie/test', component: EnteringTestComponent },
      { path: 'zadania/wskazywanie/ustawienia', component: PointingSettingsComponent },
      { path: 'zadania/wskazywanie/test', component: PointingTestComponent },
      { path: 'zadania/przeciaganie/ustawienia', component: SlideringSettingsComponent },
      { path: 'zadania/przeciaganie/test', component: SlideringTestComponent },

      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    AlertifyService,
    AuthService,
    StudentService,
    SlideringService,
    PointingService,
    EnteringService,
    AuthGuard,

    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
