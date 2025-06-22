export interface IEnvironment {
  // si build en mode production
  production: boolean,

  // Utilisation de fausse Données (mock-data)
  isFakeData: boolean,

  // Nom de le config du build
  name: string,

  // Api base url
  api_base: string,

  // Main page title
  main_page_title: string
}
