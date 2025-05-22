import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core'; // Importa ViewChild
import { IonicModule, IonInfiniteScroll } from '@ionic/angular'; // Importa IonInfiniteScroll
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, // Para que sea similar al ejemplo de Pokémon
  imports: [CommonModule, IonicModule, FormsModule], // Mantenemos los imports aquí para standalone
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll | undefined;

  characters: any[] = [];
  currentPage: number = 1;
  loading: boolean = false;
  searchTerm: string = '';
  searchError: string = '';
  private apiBaseUrl: string = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCharacters(); // Carga inicial de personajes
  }

  loadCharacters(isNewSearch: boolean = false, event?: any) {
    if (isNewSearch) {
      this.currentPage = 1;
      this.characters = [];
      this.searchError = '';
      if (this.infiniteScroll) {
        this.infiniteScroll.disabled = false; // Habilita el scroll para la nueva búsqueda/lista
      }
    }

    if (this.loading && !event) { // Evita múltiples cargas si ya está cargando y no es un evento de scroll
        if(event?.target) event.target.complete();
        return;
    }

    this.loading = true;

    let apiUrl = `${this.apiBaseUrl}?page=${this.currentPage}`;
    if (this.searchTerm.trim() !== '') {
      apiUrl += `&name=${encodeURIComponent(this.searchTerm.trim())}`;
    }

    this.http.get<any>(apiUrl).subscribe({
      next: (res) => {
        if (res.results && res.results.length > 0) {
          this.characters = [...this.characters, ...res.results];
          this.currentPage++;
          this.searchError = ''; // Limpia error si se encuentran resultados
        } else if (this.searchTerm.trim() !== '' && this.characters.length === 0) {
          // Si es una búsqueda y no se encontraron resultados en la primera página de búsqueda
          this.searchError = `No characters found for "${this.searchTerm}".`;
        } else if (this.characters.length === 0 && !this.searchTerm.trim()){
           // Si no hay búsqueda y la API no devuelve nada (poco probable para la carga inicial sin filtro)
           this.searchError = 'No characters found.';
        }


        this.loading = false;
        if (event?.target) {
          event.target.complete();
        }
        // Deshabilitar el scroll infinito si no hay más páginas o si no hubo resultados
        if (!res.info?.next || (res.results && res.results.length === 0)) {
          if (event?.target) {
            event.target.disabled = true;
          } else if (this.infiniteScroll) {
            this.infiniteScroll.disabled = true;
          }
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 404 && this.searchTerm.trim() !== '') {
          this.searchError = `No characters found for "${this.searchTerm}".`;
          this.characters = []; // Limpia personajes si la búsqueda da 404
        } else {
          this.searchError = 'Error loading characters. Please try again.';
          console.error('Error loading characters:', err);
        }
        if (event?.target) {
          event.target.complete();
          event.target.disabled = true; // Deshabilita en error también
        } else if (this.infiniteScroll) {
            this.infiniteScroll.disabled = true;
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  handleSearchInput(event: any) {
    const newSearchTerm = event.target.value || '';
    // Solo recargar si el término de búsqueda realmente cambia o si se limpia
    if (this.searchTerm !== newSearchTerm.trim() || (newSearchTerm.trim() === '' && this.searchTerm !== '')) {
        this.searchTerm = newSearchTerm.trim();
        this.loadCharacters(true); // true indica que es una nueva búsqueda
    }
  }

  loadMoreCharacters(event: any) {
    this.loadCharacters(false, event); // false indica que no es una nueva búsqueda, sino carga de más datos
  }

  viewCharacterDetails(characterId: number): void {
    this.router.navigate(['/characters-details', characterId]);
  }

  // Opcional: un método para limpiar explícitamente la búsqueda y recargar todo
  clearSearchAndReload() {
    this.searchTerm = '';
    this.loadCharacters(true); // Recarga como si fuera una nueva búsqueda (lista completa)
  }
}
