import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from 'primeng/api';
import * as commonAction from './action';
import { tap } from "rxjs";

@Injectable()
export class CommonEffect {

  constructor(private _action$: Actions, private _messageService: MessageService){}
  displayMessage$ = createEffect(()=>
    this._action$.pipe(
      ofType(commonAction.displayMessageAction),
      tap(({message})=>
        this._messageService.add({severity: message.isOnError ? 'error' : 'success', summary: message.title, detail: message.message })
      )
    ),
    { dispatch: false }
  )

}
