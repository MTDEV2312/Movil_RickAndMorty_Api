import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate que FormsModule esté importado
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonImg, IonLabel, IonItem, IonList, IonSpinner, IonIcon, IonNote, IonListHeader,
  IonButton, IonTextarea, // Añade IonTextarea
  ToastController // Añade ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, informationCircleOutline, sadOutline, pulseOutline, closeCircleOutline, helpCircleOutline, calendarOutline, planetOutline, maleFemaleOutline, bodyOutline, tvOutline, refreshOutline, locationOutline, filmOutline } from 'ionicons/icons';
import { BDDService, Character as AppCharacter } from '../services/bdd.service'; // Importa tu servicio y la interfaz

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.page.html',
  styleUrls: ['./characters-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, // Asegúrate que FormsModule esté aquí
    IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonImg, IonLabel, IonItem, IonList,
    IonSpinner, IonIcon, IonNote, IonListHeader,
    IonButton, IonTextarea // Añade IonTextarea aquí
  ]
})
export class CharactersDetailsPage implements OnInit {
  character: any = null; // Este es el personaje de la API
  isLoading: boolean = false;
  error: string = '';
  characterId: string | null = null;
  userComment: string = ''; // Para el comentario del usuario
  savingComment: boolean = false; // Para el estado de carga del botón de guardar

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    private bddService: BDDService, // Inyecta tu servicio BDD
    private toastController: ToastController // Inyecta ToastController
  ) {
    addIcons({sadOutline,refreshOutline,maleFemaleOutline,bodyOutline,planetOutline,locationOutline,calendarOutline,filmOutline,tvOutline,arrowBackOutline,informationCircleOutline,pulseOutline,closeCircleOutline,helpCircleOutline});
  }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id');
    if (this.characterId) {
      this.loadCharacterDetails(this.characterId);
    } else {
      this.error = 'Character ID not found in route.';
      console.error(this.error);
    }
  }

  loadCharacterDetails(id: string): void {
    this.isLoading = true;
    this.error = '';
    this.character = null;
    this.userComment = ''; // Resetea el comentario al cargar un nuevo personaje

    this.http.get<any>(`https://rickandmortyapi.com/api/character/${id}`).subscribe({
      next: (data) => {
        this.character = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading character details:', err);
        this.isLoading = false;
        if (err.status === 404) {
            this.error = `Character with ID ${id} not found.`;
        } else {
            this.error = 'Failed to load character details. Please try again.';
        }
      }
    });
  }

  async saveCharacterWithComment() {
    if (!this.character) {
      this.presentToast('Character data not loaded yet.', 'warning');
      return;
    }
    if (!this.userComment.trim()) {
      this.presentToast('Please enter a comment before saving.', 'warning');
      return;
    }

    this.savingComment = true;

    // Prepara el objeto personaje para guardar, incluyendo el comentario
    // Asegúrate de que la estructura coincida con tu interfaz Character en BDDService
    const characterToSave: AppCharacter = {
      id: this.character.id,
      name: this.character.name,
      status: this.character.status,
      species: this.character.species,
      type: this.character.type || '', // Asegura que type no sea undefined
      gender: this.character.gender,
      origin: {
        name: this.character.origin?.name || 'Unknown',
        url: this.character.origin?.url || ''
      },
      location: {
        name: this.character.location?.name || 'Unknown',
        url: this.character.location?.url || ''
      },
      image: this.character.image,
      episode: this.character.episode || [],
      url: this.character.url,
      comment: this.userComment.trim(), // Añade el comentario del usuario
      created: new Date().toISOString() // BDDService también lo establece, pero es bueno tenerlo aquí
    };

    try {
      await this.bddService.addCharacter(characterToSave);
      this.presentToast('Character and comment saved successfully!', 'success');
      this.userComment = ''; // Limpia el campo de comentario después de guardar
    } catch (error) {
      console.error('Error saving character:', error);
      this.presentToast('Failed to save character. Please try again.', 'danger');
    } finally {
      this.savingComment = false;
    }
  }

  async presentToast(message: string, color: string) { // Cambiado el tipo de color a string general
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Aumentado un poco la duración para asegurar visibilidad
      color, // Ionic intentará aplicar este color
      position: 'bottom',
      buttons: [ // Añadido un botón de cierre por si acaso
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }


  goBack(): void {
    this.location.back();
  }

  getStatusIcon(status: string): string {
    if (status === 'Alive') return 'pulse-outline';
    if (status === 'Dead') return 'close-circle-outline';
    return 'help-circle-outline';
  }

  getStatusColor(status: string): string {
    if (status === 'Alive') return 'success';
    if (status === 'Dead') return 'danger';
    return 'medium';
  }
}
