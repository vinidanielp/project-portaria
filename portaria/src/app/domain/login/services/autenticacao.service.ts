import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, take, tap, throwError } from 'rxjs';
import { Login } from 'src/app/core/models/login';
import { Usuario } from 'src/app/core/models/usuario';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private readonly API = 'api/login';

    /**
   * @var autenticacaoUsuario
   */
    public autenticacaoUsuario: Usuario = new Usuario();

   /**
   * @var _isAutenticado
   */
   public _isAutenticado = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService
  ) { }

  /**
   * Verifica se o usuario está conectado
  */
  public get isAuthenticated(): Observable<boolean> {
    return this._isAutenticado.asObservable();
  }

   //Método para logar no sistema
  public postLogin(record: Partial<Login>) {
    return this.http.post<any>(this.API, record)
      .pipe(
        map(res => res),
        tap(res => {
          this.setEstadoAutenticacao({
            id: res && res["id"],
            token: res && res["token"],
            refreshToken: res && res["refreshToken"],
            isAutenticado: res !== null
          });
        }),

        catchError((error: any) => {
          this.setEstadoAutenticacao({
            id: 0,
            token: '',
            refreshToken: '',
            isAutenticado: false
          });
          return throwError(() => error);
        })
      );
  }

  /**
   * Definir o status do usuário no aplicativo
   *
   * @param authData
  */
  private setEstadoAutenticacao(authData: { id: number; token: string; refreshToken: string; isAutenticado: boolean; }): void {
    if (authData.isAutenticado) {
      this.localStorageService.set("token", btoa(authData.token));
      this.localStorageService.set("refreshToken", btoa(authData.refreshToken));

      this.setAutenticacaoUsuario(authData.id)
        .pipe(
          take(1),
          tap(() => this._isAutenticado.next(authData.isAutenticado))
        )
        .subscribe();
      return;
    }
    this._isAutenticado.next(authData.isAutenticado);
  }

  /**
    * Defina o usuário no armazenamento local.
    *
    * @param idUsuario
  */
  private setAutenticacaoUsuario(idUsuario: number): Observable<Usuario> {
    return this.usuarioService.getUsuarioById(idUsuario).pipe(
      tap((usuario: Usuario) => {
        this.autenticacaoUsuario = usuario;
        this.localStorageService.setObject("usuario", usuario);
      })
    );
  }

  /**
   * se tivermos, o usuário está logando.
  */
  public hasToken(): boolean {
    return !!this.localStorageService.get("token");
  }

  /**
   * Returna token
  */
  public getToken(): string {
    return atob(this.localStorageService.get("token"));
  }


  // public atualizarToken(): Observable<any> {
  //   return this.http.get(this.getUrl("/refresh"), this.getParam("refreshToken", this.getAtualizaToken()))
  //     .pipe(
  //       take(1),
  //       tap(res =>
  //         this.setEstadoAutenticacao({
  //           id: res && res["id"],
  //           token: res && res["accessToken"],
  //           refreshToken: res && res["refreshToken"],
  //           isAutenticado: res !== null
  //         })
  //       )
  //     );
  // }

  /**
   *
   * @param token
   */
  public isTokenExpirado(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }

    if (!token) {
      return true;
    }

    const date = this.getDataExpiracaoToken(token);

    if (date === null || date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  /**
   *
   * @param token
   */
  public isAtualizacaoTokenExpirada(refreshToken?: string): boolean {
    if (!refreshToken) {
      refreshToken = this.getAtualizaToken();
    }

    if (!refreshToken) {
      return true;
    }

    const date = this.getDataExpiracaoToken(refreshToken);

    if (date === null || date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  /**
   * Returna data de expiração do token.
   *
   * @param token
   */
  public getDataExpiracaoToken(token: string): Date | null {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  /**
   * Returna token atualizado
  */
  protected getAtualizaToken(): string {
    return atob(this.localStorageService.get("refreshToken"));
  }

  /**
  * Logout usuario.
  */
  public logout(): void {
    this.autenticacaoUsuario = new Usuario();
    this._isAutenticado.next(false);
    this.localStorageService.remove("user");
    this.localStorageService.remove("token");
    this.localStorageService.remove("expireIn");
    this.localStorageService.remove("refreshToken");
    this.router.navigate(["/login"]);
  }
}
