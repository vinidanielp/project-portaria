import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  public title: string = 'Portaria | Isoeste Metálica';

  constructor(private router: Router) {}

  public menus: Array<PoMenuItem> = [
    { label: 'Home', icon: 'po-icon-home', shortLabel: 'H', link: 'home' },

    {
      label: 'Lançamentos',
      icon: 'po-icon-map',
      shortLabel: 'L',
      link: 'lancamentos/',
      subItems: [
        { label: 'Incluir', link: 'lancamentos/incluir' },
        { label: 'Consultar', link: 'lancamentos/consultar' },
      ],
    },

    {
      label: 'Cadastros',
      icon: 'po-icon-document-filled',
      shortLabel: 'C',
      link: 'cadastros/',
      subItems: [
        { label: 'Motorista', link: 'cadastros/motorista' },
        { label: 'Veículo', link: 'cadastros/veiculo' },
      ],
    },

    {
      label: 'Visitantes',
      icon: 'po-icon-users',
      shortLabel: 'V',
      link: 'visitantes',
    },
    {
      label: 'Configurações',
      icon: 'po-icon-settings',
      shortLabel: 'C',
      link: 'configuracoes/',
      subItems: [
        { label: 'Usuário', link: 'configuracoes/usuario' },
        { label: 'Permissão', link: 'configuracoes/permissao' },
        { label: 'Perfil', link: 'configuracoes/perfil' }],
    },
  ];

  profile: PoToolbarProfile = {
    avatar: 'https://via.placeholder.com/48x48?text=AVATAR',
    title: 'Vinicius Daniel',
    subtitle: 'vinicius.pretti@isoeste.com.br',
  };

  profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-exit',
      label: 'Exit',
      type: 'danger',
      action: () => this.logout(),
    },
  ];

  logout(): void {
    this.router.navigate(['/login']).then();
  }
}
