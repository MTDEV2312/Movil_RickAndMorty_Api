import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';


export interface Character {
  id:number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  comment: string;
  created: string;
}
@Injectable({
  providedIn: 'root'
})

export class BDDService {

  constructor(private firestore: Firestore) { }

  addCharacter(character: Character){
    const characterRef = collection(this.firestore, 'characters');
    character.created = new Date().toISOString();
    return addDoc(characterRef, character);
  }
}
