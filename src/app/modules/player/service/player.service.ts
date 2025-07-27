import { Injectable, signal } from '@angular/core';
import { IResponsiblePlayer } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private player = signal<IResponsiblePlayer | null>(null);

  constructor() { this.fakeUser() }

  setUser(player: IResponsiblePlayer) {
    this.player.set(player);
    localStorage.setItem('player', JSON.stringify(player));
  }

  getUser = this.player.asReadonly();

  loadUserFromStorage() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.player.set(JSON.parse(stored));
    }
  }

  fakeUser() {
    var fakePlayer: IResponsiblePlayer = {
      email: 'helixia22@hotmail.fr',
      playerId: "1",
      jwt: '',
      role: 'seller',
      familyPlayers: [],
      name: ''
    }

    this.setUser(fakePlayer)
  }
}
