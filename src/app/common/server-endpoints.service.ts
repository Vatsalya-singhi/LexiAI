import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerEndpointsService {

  constructor(private http: HttpClient) { }


  // done
  public getLanguages(): Observable<any> {
    return this.http.get(`http://localhost:3000/languages`);
  }

  // done
  public getLevels(): Observable<any> {
    return this.http.get(`http://localhost:3000/levels`);
  }

  // done
  public getStepsByID(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/levels/${id}`);
  }
  
  public getSlideShowByID(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/slideshows/${id}`);
  }

  public getSlidesByID(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/slides/${id}`);
  }

}
