import { IGameTextInformationDto } from "../../game-text/models/game-text-information.dto"

export interface IMentalMathDataDto {
  gameTextInformation: IGameTextInformationDto,
  option: IOptionDto,
  operations: IOperationDto[],
  corrections: IOperationCorrectionDto[]
}

export interface IOptionDto {
  gameLevel: string,
  isMultipleChoiceVisible: boolean
  backImageName: string
}

export interface IOperationDto {
  id: number,
  timeToCalculate: ITimeToCalculateDto,
  mentalNumbers: IMentalNumberDto[],
  mathOperations: string[],
  proposalResponse: IProposalResponseDto[]
}

export interface IMentalNumberDto {
  id: number,
  number: number,
  cardBackImageName: string
}

export interface ITimeToCalculateDto {
  unit: string,
  time: number
}

export interface IProposalResponseDto {
  id: number,
  proposalResponse: number
}

export interface IOperationCorrectionDto {
  operationId: number,
  operationResult: number
}

