import { AdminLayoutService } from './services/admin-layout.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { Util } from 'src/app/core/util/util';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit{
  public menus: Array<PoMenuItem> = [];
  public src: string = 'https://picsum.photos/200';
  public nomeUsuario: string = this.adminLayoutService.recuperaNomeUsuarioLogado();

  constructor(
    private router: Router,
    private adminLayoutService: AdminLayoutService,
    ) { }


  ngOnInit(): void {
    this.criarMenuPorPermissao();
  }

  public profile: PoToolbarProfile = {
    avatar: 'https://picsum.photos/200',
    title: this.nomeUsuario,
  };

  public profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-exit',
      label: 'Sair',
      type: 'danger',
      action: () => this.logout(),
    },
  ];

  private logout(): void {
    this.adminLayoutService.logout();
    this.router.navigate(['/login']).then();
  }

  private criarMenuPorPermissao() {
    const itens: PoMenuItem[] = []

    if(Util.isPermissao('ROLE_HOME')) {
      itens.push({
        label: 'Home',
        icon: 'po-icon-home',
        shortLabel: 'H',
        link: 'home',
      });
    }

    if(Util.isPermissao('ROLE_LANCAMENTOS_INCLUIR') || Util.isPermissao('ROLE_LANCAMENTOS_CONSULTAR')) {
      itens.push({
        label: 'Lançamentos',
        icon: 'po-icon-map',
        shortLabel: 'L',
        link: 'lancamentos/',
        subItems: this.subMenuLancamentosComPermissao()
      });
    }

    if(Util.isPermissao('ROLE_CADASTROS_MOTORISTA') || Util.isPermissao('ROLE_CADASTROS_VEICULO')) {
    itens.push({
        label: 'Cadastros',
        icon: 'po-icon-document-filled',
        shortLabel: 'C',
        link: 'cadastros/',
        subItems: this.subMenuCadastrosComPermissao()
      });
    }

    if(Util.isPermissao('ROLE_VISITANTES')) {
      itens.push({
        label: 'Visitantes',
        icon: 'po-icon-users',
        shortLabel: 'V',
        link: 'visitantes',
      });
    }

    if(Util.isPermissao('ROLE_CONFIGURACAO')) {
      itens.push({
        label: 'Configurações',
        icon: 'po-icon-settings',
        shortLabel: 'C',
        link: 'configuracoes/',
        subItems: [
          { label: 'Usuário', link: 'configuracoes/usuario' },
          { label: 'Permissão', link: 'configuracoes/permissao' },
          { label: 'Perfil', link: 'configuracoes/perfil' },
        ],
      });
    }

    this.menus = itens;
  }


  private subMenuLancamentosComPermissao() {
    const subItems: PoMenuItem[] = []

    if(Util.isPermissao('ROLE_LANCAMENTOS_INCLUIR')) {
      subItems.push({
        label: 'Incluir',
        link: 'lancamentos/incluir'
      })
    }

    if(Util.isPermissao('ROLE_LANCAMENTOS_CONSULTAR')) {
      subItems.push({
        label: 'Consultar',
        link: 'lancamentos/consultar'
      })
    }

    return subItems;
  }


  private subMenuCadastrosComPermissao() {
    const subItems: PoMenuItem[] = []

    if(Util.isPermissao('ROLE_CADASTROS_MOTORISTA')) {
      subItems.push({
        label: 'Motorista',
        link: 'cadastros/motorista'
      })
    }

    if(Util.isPermissao('ROLE_CADASTROS_VEICULO')) {
      subItems.push({
        label: 'Veículo',
        link: 'cadastros/veiculo'
      })
    }

    return subItems;
  }
}
