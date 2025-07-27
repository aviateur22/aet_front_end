import { IMentalCardState, IMentalMathState, IOperationCorrectionState, IOperationState, IPropsalResponseState } from "../../store/mentalMathematic/state";
import { IMentalMathDataDto, IMentalNumberDto, IOperationCorrectionDto, IOperationDto, IProposalResponseDto } from "../models/mental-math.dto";

/**
 * Map le données du WS vers IMentalMathState
 * @param { IMentalMathDataDto } dto
 * @returns IMentalMathState
 */
export function mapToMentalMathState(dto: IMentalMathDataDto): IMentalMathState {

  const mentalMathState: IMentalMathState = {
    arePropoalResponseVisible: false,
    operations: mapToOperationstate(dto.operations),
    corrections: mapToOperationCorrectionState(dto.corrections),
    badResponseCumultated: 0,
    isGameFinish: false,
    isGameWin: false,
    activeOperationId: 0,
    isActiveOperationVisible: false
  }

  return mentalMathState;
}

export function mapToOperationstate(dtos: IOperationDto[]): IOperationState[] {
  return dtos.map(dto => {

    const operationState: IOperationState = {
      id: dto.id,
      timeToCalculate: dto.timeToCalculate,
      mentalCards: mapToMentalCardState(dto.mentalNumbers),
      mathOperations: dto.mathOperations,
      proposalResponse: mapToPropsalResponseState(dto.proposalResponse)
    }
    return operationState;
  })
}

export function mapToMentalCardState(dtos: IMentalNumberDto[]): IMentalCardState[] {
  return dtos.map(dto => {
    const mentalCardSate: IMentalCardState = {
      id: dto.id,
      number: dto.number,
      isCardReturn: false,
      cardBackImageName: dto.cardBackImageName
    }
    return mentalCardSate;
  });
}

export function mapToOperationCorrectionState(dtos: IOperationCorrectionDto[]): IOperationCorrectionState[] {
  return dtos.map(dto => {
    let correction : IOperationCorrectionState = {
      operationId: dto.operationId,
      operationResult: dto.operationResult,
      playerAnswer: {
        operationId: dto.operationId,
        playerAnswer: 0,
        isAnswerValid: false
      }
    }

    return correction;
  })
}

export function mapToPropsalResponseState(dtos: IProposalResponseDto[]): IPropsalResponseState[] {
  return dtos.map(dto => {
    const proposalState: IPropsalResponseState = {
      id: dto.id,
      proposalResponse: dto.proposalResponse,
      isProposalSelected: false
    }
    return proposalState;
  });
}
