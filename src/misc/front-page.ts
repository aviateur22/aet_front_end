import { environment } from "../environment/environment";

export default {
  home: {
    url: '',
    title:  `${environment.main_page_title} | Bienvenue`
  },
  gameSelection: {
    url: 'jeux/selection',
    title:  `${environment.main_page_title} | Sélection du jeu`
  },
  mathSelection: {
    url: 'math/selection',
    title:  `${environment.main_page_title} | Sélection du jeu`
  },
  mentalMathemtic: {
    url: 'math/calcul-mental',
    title:  `${environment.main_page_title} | Calcul mental`
  },
  memoryCardGame: {
    url: 'jeux/carte-memoire',
    title:  `${environment.main_page_title} | Jeu carte mémoire`
  },
  memoryColorGame: {
    url: 'jeux/couleurs-memoire',
    title:  `${environment.main_page_title} | Jeu des couleurs`
  }
}
