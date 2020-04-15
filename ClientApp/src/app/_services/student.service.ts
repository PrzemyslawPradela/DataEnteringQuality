import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + 'api/students');
  }

  register(student: Student) {
    return this.http.post<any>(this.baseUrl + 'api/students/register', student)
      .pipe(map(student => {
        localStorage.setItem('currentStudent', JSON.stringify(student));
      }));
  }

}
