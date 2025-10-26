import { IGameTextInformationDto } from "../../game-text/models/game-text-information.dto"

export interface IMentalMathDataDto {
  gameTextInformation: IGameTextInformationDto,
  option: IOptionDto,
  operations: IOperationDto[]
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
  proposalResponses: IProposalResponseDto[],
  validOperationResponse: number
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

