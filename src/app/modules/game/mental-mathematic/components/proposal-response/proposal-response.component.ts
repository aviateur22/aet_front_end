import { Component, Input } from '@angular/core';
import { ProposalResponse } from '../../models/mental-math.model';
import { MentalMathematicGameRule } from '../../../business/mental-mathematic-game.rule';

@Component({
  selector: 'app-proposal-response',
  templateUrl: './proposal-response.component.html',
  styleUrl: './proposal-response.component.css'
})
export class ProposalResponseComponent {
  @Input() proposalResponse!: ProposalResponse;

  constructor(private _mentalMathematicGameRule: MentalMathematicGameRule){
  }

  selectProposalResponse() {
    this._mentalMathematicGameRule.selectPropsalResponse(this.proposalResponse.id);

  }
}
