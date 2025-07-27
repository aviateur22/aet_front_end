import { IMentalCardState, IOperationState  } from "../../store/mentalMathematic/state";
import { ActiveOperation, MentalCard } from "../models/mental-math.model";

export function mapToOperationModel(activeOperation: IOperationState, isActiveOperationVisible: boolean): ActiveOperation {

  return new ActiveOperation(
    activeOperation.id,
    activeOperation.timeToCalculate.time,
    isActiveOperationVisible,
    mapToMentalCardModel(activeOperation.mentalCards),
    activeOperation.mathOperations,
    activeOperation.proposalResponse
  );
}

export function mapToMentalCardModel(mentalCards: IMentalCardState[]): MentalCard[] {

  return mentalCards.map( mentalCard => {
    return new MentalCard(
      mentalCard.id,
      mentalCard.number,
      mentalCard.cardBackImageName,
      mentalCard.isCardReturn
    )}
  )
}
