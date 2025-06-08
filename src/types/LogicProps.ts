import { LogicSkillProps } from "./LogicSkillProps";

export type LogicProps = {
  parameter: number;
  maxHp: number;
  currentHp: number;
  IncreasedEnergyConsumption: number;
  ReducedEnergyConsumption: number;
  gameParameterIncreace: number;
  gameParameterDecreace: number;
  totalTurn: number;
  currentTurn: number;
  extraTurn: number;
  gameGoodImpression: number;
  gameMotivation: number;
  gameFine: number;
  plusPlayCard: number;
  numOfDraw: number;
  startSkill: Array<LogicSkillProps>;
  endSkill: Array<LogicSkillProps>;
  beforeCardPlaySkill: Array<LogicSkillProps>;
  afterCardPlaySkill: Array<LogicSkillProps>;
};
