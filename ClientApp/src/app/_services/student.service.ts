import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private currentStudentSubject: BehaviorSubject<Student>;
  public currentStudent: Observable<Student>;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.currentStudentSubject = new BehaviorSubject<Student>(JSON.parse(localStorage.getItem('currentStudent')));
    this.currentStudent = this.currentStudentSubject.asObservable();
  }

  public get currentStudentValue(): Student {
    return this.currentStudentSubject.value;
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + 'api/students');
  }

  register(student: Student) {
    return this.http.post<any>(this.baseUrl + 'api/students/register', student)
      .pipe(map(student => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentStudent', JSON.stringify(student));
      }));
  }

}
