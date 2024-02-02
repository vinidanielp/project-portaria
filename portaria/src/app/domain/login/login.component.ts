import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoLanguage } from '@po-ui/ng-components';
import { PoPageLoginLiterals } from '@po-ui/ng-templates';
import { Login } from 'src/app/core/models/login';
import { AutenticacaoService } from './services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  versao: string = 'v1.0.0';
  loginErrors: string[] = [];
  passwordErrors: string[] = [];
  rememberUser = true;
  loading = false;
  logo = 'assets/images/logo-metalica.png';
  // background = 'assets/images/teste3.svg';

  languages: Array<PoLanguage> = [{ language: 'pt', description: 'Português' }];

  customLiterals: PoPageLoginLiterals = {
    welcome: 'Bem-vindo(a)',
    loginLabel: 'Usuário',
    loginPlaceholder: 'Insira seu usuário',
    loginHint: 'Mesmo usuário quando liga o computador',
    loginErrorPattern: 'Campo Usuário Obrigatório',
    passwordLabel: 'Senha',
    passwordPlaceholder: 'Insira sua senha',
    passwordErrorPattern: 'Campo Senha Obrigatório',
    submitLabel: 'Entrar',
  };

  public loginForm: FormGroup = new FormGroup({
    login: new FormControl(),
    senha: new FormControl(),
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService
    ) {}

  ngOnInit() {}

  login(formData: any) {
    this.loading = true;

    if(formData.login !== null && formData.password !== null) {
      let login: Login = {login: formData.login, senha: formData.password}

      this.autenticacaoService.postLogin(login).subscribe({
        next: () => {
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['home']);
          }, 1000);
        },
        error: () => {
          this.loading = false;
          this.passwordErrors = this.loginErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
        }
      })
    }
  }
}
