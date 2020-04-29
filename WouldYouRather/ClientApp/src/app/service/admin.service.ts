import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiPath = `${environment.serverPath}`;

  constructor(private http: HttpClient,
              private authService: AuthService) { }


}
