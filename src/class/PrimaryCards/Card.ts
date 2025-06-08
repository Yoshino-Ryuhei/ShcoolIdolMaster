import { LogicProps } from "../../types/LogicProps.ts";
import { SenseProps } from "../../types/SenseProps.ts";
import { Plan } from "../../types/Plan.ts";
import { CardType } from "../../types/CardType.ts";
import { CalcHpType } from "../../types/CalcHpType.ts";

export abstract class Card {
  public plan: Plan;
  public type: CardType;
  public name: string;
  public grade: number;
  public desc: string;
  public cost: number;
  public parameter: number;
  public parameterCount: number;
  protected fine: number;
  public onlyOnce: boolean;

  abstract gradeList;

  constructor(
    plan: Plan,
    type: CardType,
    name: string,
    grade: number,
    desc: string,
    cost: number,
    parameter: number,
    parameterCount: number,
    fine: number,
    onlyOnce: boolean
  ) {
    this.plan = plan;
    this.type = type;
    this.name = name;
    this.grade = grade;
    this.desc = desc;
    this.cost = cost;
    this.parameter = parameter;
    this.parameterCount = parameterCount;
    this.fine = fine;
    this.onlyOnce = onlyOnce;
  }

  abstract copyCard();
  abstract applyLogicEffect(prop: LogicProps): LogicProps;
  abstract applySenseEffect(prop: SenseProps): SenseProps;

  // カード使用後の体力の計算(元気あり)
  public calclateHp(props: CalcHpType): CalcHpType {
    let { gH, gF, iEC, rEC } = props;
    let IEC: number = 1;
    let REC: number = 1;
    if (iEC) {
      IEC = 2;
    }
    if (rEC) {
      REC = 2;
    }
    let fine: number = gF - Math.ceil((this.cost * (2 * IEC)) / (2 * REC));
    if (fine < 0) {
      gF = 0;
      gH += fine;
    } else {
      gF = fine;
    }
    return { gH, gF, iEC, rEC };
  }

  // カード使用後の体力の計算(直接体力消費)
  public calclateOnlyHp(props: CalcHpType): CalcHpType {
    let { gH, gF, iEC, rEC } = props;
    let IEC: number = 1;
    let REC: number = 1;
    if (iEC) {
      IEC = 2;
    }
    if (rEC) {
      REC = 2;
    }
    let hp: number = gH - Math.ceil((this.cost * (2 * IEC)) / (2 * REC));
    gH = hp;
    return { gH, gF, iEC, rEC };
  }

  // 現在の体力の％を出力
  public currentHpPercentage(maxHp: number, currentHp: number): number {
    return Math.ceil((currentHp * 100) / maxHp);
  }

  // 体力がn%以上ならtrue
  public isHpAbove(
    maxHp: number,
    currentHp: number,
    percentage: number
  ): boolean {
    if (this.currentHpPercentage(maxHp, currentHp) >= percentage) {
      return true;
    } else {
      return false;
    }
  }

  // 体力がn%以下ならtrue
  public isHpBelow(
    maxHp: number,
    currentHp: number,
    percentage: number
  ): boolean {
    if (this.currentHpPercentage(maxHp, currentHp) <= percentage) {
      return true;
    } else {
      return false;
    }
  }

  // n％分体力回復
  public recoverHpPercent(
    maxHp: number,
    currentHp: number,
    percentage: number
  ): number {
    let recoverHp = Math.ceil((maxHp * percentage) / 100);
    if (recoverHp + currentHp > maxHp) {
      return maxHp;
    } else {
      return recoverHp + currentHp;
    }
  }

  // 体力をn回復
  public recoverHp(maxHp: number, currentHp: number, n: number): number {
    if (n + currentHp > maxHp) {
      return maxHp;
    } else {
      return n + currentHp;
    }
  }

  // パラメータ上昇量を％に変換
  public changeParameterIncreaceToPercent(
    gameParameterIncreace: number
  ): number {
    return 1 + Math.ceil(gameParameterIncreace / 100);
  }

  // パラメータ減少量を％に変換
  public changeParameterDecreaceToPercent(
    gameParameterDecreace: number
  ): number {
    return 1 + Math.ceil(gameParameterDecreace / 100);
  }

  // このターンのカードドロー枚数の計算
  public calclateNumOfDraw(numOfDraw: number, currentDraw: number): number {
    return numOfDraw + currentDraw;
  }

  // プレイ可能枚数追加
  public calclatePlusPlayCard(plusPlayCard: number, count: number): number {
    return plusPlayCard + count;
  }

  // エクストラターン追加
  public calclateExtraTurn(extraTurn: number, count: number): number {
    return extraTurn + count;
  }

  // 消費体力増加ターン計算
  public calclateIncreasedEnergyConsumption(
    IncreasedEnergyConsumption: number,
    count: number
  ) {
    return IncreasedEnergyConsumption + count;
  }

  // 消費体力減少ターン計算
  public calclateReducedEnergyConsumption(
    ReducedEnergyConsumption: number,
    count: number
  ) {
    return ReducedEnergyConsumption + count;
  }
}
