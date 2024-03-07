import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('mySearchbar') searchbar: IonSearchbar;
  lista_animes: any[] = [];
  animes: any[] = [];
  public user: any;
  isLoading: boolean = false;
  hasSearched: boolean = false;
  query: any;
  model: any = {
    icon: 'close-outline',
    title: 'Nenhum anime cadastrado.'
  };
  emptySearchModel: any = {
    icon: 'search-outline',
    title: 'Nenhum anime encontrado.'
  };

  constructor(private router: Router, private firebaseService: FirebaseService, private AuthSerivce: AuthService) {
    this.isLoading = true;
    this.hasSearched = false;
    this.user = this.AuthSerivce.getUserLogged();
    this.firebaseService.buscarTodos(this.user.uid)
      .subscribe(res => {
        this.lista_animes = res.map(anime => {
          return {
            id: anime.payload.doc.id,
            ...anime.payload.doc.data() as any
          } as Anime;
        });
        this.isLoading = false;
      });
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  editar(anime: Anime) {
    console.log("OOOOOOOI");
    this.router.navigateByUrl("/detalhar", { state: { anime: anime } });
  }

  logout() {
    this.AuthSerivce.signOut()
      .then((res) => {
        this.router.navigate(["signin"]);
      })
  }

  async onSearchChange(event) {
    this.hasSearched = true;
    this.query = event.detail.value.toLowerCase();
    this.animes = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async () => {
        this.animes = await this.lista_animes.filter((element: any) => {
          return element.nome.includes(this.query);
        })
        console.log(this.animes);
        this.isLoading = false;
      }, 3000);
    }
  }

  returnSearch() {
    this.hasSearched = false;
    this.searchbar.value = null;
  }
}