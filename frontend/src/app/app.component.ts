import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  language = 'ua' as any;

  constructor(private tokenStorageService: TokenStorageService, private translate: TranslateService, private titleService: Title) { 
      translate.setDefaultLang('ua');
      const l = translate.getBrowserLang();
      this.language = l;
      translate.use(l ? l: 'ua');

      translate.onLangChange.subscribe((event: LangChangeEvent) => {
        // Change page title when user changes language preference
        translate.get('eventSchedule').subscribe((res: string) => {
          titleService.setTitle(res);
        });
      });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  langChanged(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
