import { Injectable, OnDestroy } from '@angular/core';
import { UserType } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserType | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserType | undefined;
  USER_KEY = '[user]'

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    const accessToken = localStorage.getItem('accessToken');
    
    return this.http.post<UserType>(
      environment.apiUrl + '/users/login',
      { email, password },).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  register(username: string,email: string,phone: string,password: string,rePassword: string) {
    return this.http
      .post<UserType>(environment.apiUrl+'/users/register', {username,email,phone,password,rePassword,})
      .pipe(
        tap((response: any) => {
          const accessToken = response.accessToken;
          (localStorage.setItem('accessToken', accessToken));
        })
      );
  }

  logout() {
    localStorage.removeItem('accessToken')
    return this.http
      .post(environment.apiUrl+'/users/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getProfile() {
    return this.http
      .get<UserType>(environment.apiUrl+'/users/me')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string, phone?: string) {
    return this.http
      .put<UserType>(environment.apiUrl+'/users/me', {
        username,
        email,
        phone,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  getToken(){
    return localStorage.getItem('accessToken')
  }
}