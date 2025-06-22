import { Route } from "@angular/router";
import frontPage from "../../../../misc/front-page";
import { HomePageComponent } from "../pages/home-page/home-page.component";

export const authorizeRouting: Route[] = [
  { path: frontPage.home.url, component: HomePageComponent, title: frontPage.home.title }
]
