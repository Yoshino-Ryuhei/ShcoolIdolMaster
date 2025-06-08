import { CardType } from "../../types/CardType.ts";
import { ConsumeFineType } from "../../types/ConsumeFineType.ts";
import { LogicCardInformation } from "../../types/LogicCardInformation.ts";
import { LogicParameterProps } from "../../types/LogicParameterProps.ts";
import { LogicProps } from "../../types/LogicProps.ts";
import { LogicSkillProps } from "../../types/LogicSkillProps.ts";
import { Plan } from "../../types/Plan.ts";
import { SkillType } from "../../types/SkillType.ts";
import { Card } from "./Card.ts";

export abstract class LogicCard extends Card {
  // 好印象
  protected goodImpression: number;
  // やる気
  protected motivation: number;
  // 強化用情報保持リスト
  public gradeList: Array<LogicCardInformation>;

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
    onlyOnce: boolean,
    goodImpression: number,
    motivation: number,
    gradeList: Array<LogicCardInformation>
  ) {
    super(
      plan,
      type,
      name,
      grade,
      desc,
      cost,
      parameter,
      parameterCount,
      fine,
      onlyOnce
    );
    this.goodImpression = goodImpression;
    this.motivation = motivation;
    this.gradeList = [...gradeList];
  }
  // カードの効果を実行
  abstract applyLogicEffect(prop: LogicProps): LogicProps;

  // カードのグレードを変換
  public changeLogicCardInformation() {
    this.name = this.gradeList[this.grade]["name"];
    this.desc = this.gradeList[this.grade]["desc"];
    this.cost = this.gradeList[this.grade]["cost"];
    this.parameter = this.gradeList[this.grade]["parameter"];
    this.parameterCount = this.gradeList[this.grade]["parameterCount"];
    this.fine = this.gradeList[this.grade]["fine"];
    this.onlyOnce = this.gradeList[this.grade]["onlyOnce"];
    this.goodImpression = this.gradeList[this.grade]["goodImpression"];
    this.motivation = this.gradeList[this.grade]["motivation"];
  }

  // カードをアップグレード
  public upgradeLogicCard() {
    if (this.grade >= this.gradeList.length - 1) {
      alert("Can't Upgrade!");
    } else {
      this.grade += 1;
      this.changeLogicCardInformation();
    }
  }

  // カードをダウングレード
  public downgradeLogicCard() {
    if (this.grade <= 0) {
      alert("Can't Upgrade!");
    } else {
      this.grade -= 1;
      this.changeLogicCardInformation();
    }
  }

  // 次のターンカードを1枚引く
  public calclateNextOneDraw(props: LogicProps): LogicProps {
    let {
      parameter,
      maxHp,
      currentHp,
      IncreasedEnergyConsumption,
      ReducedEnergyConsumption,
      gameParameterIncreace,
      gameParameterDecreace,
      totalTurn,
      currentTurn,
      extraTurn,
      gameGoodImpression,
      gameMotivation,
      gameFine,
      plusPlayCard,
      numOfDraw,
      startSkill,
      endSkill,
      beforeCardPlaySkill,
      afterCardPlaySkill,
    } = props;

    numOfDraw = this.calclateNumOfDraw(numOfDraw, 1);

    return {
      parameter,
      maxHp,
      currentHp,
      IncreasedEnergyConsumption,
      ReducedEnergyConsumption,
      gameParameterIncreace,
      gameParameterDecreace,
      totalTurn,
      currentTurn,
      extraTurn,
      gameGoodImpression,
      gameMotivation,
      gameFine,
      plusPlayCard,
      numOfDraw,
      startSkill,
      endSkill,
      beforeCardPlaySkill,
      afterCardPlaySkill,
    };
  }

  // 次のターンカードを2枚引く
  public calclateNextTwoDraw(props: LogicProps): LogicProps {
    let {
      parameter,
      maxHp,
      currentHp,
      IncreasedEnergyConsumption,
      ReducedEnergyConsumption,
      gameParameterIncreace,
      gameParameterDecreace,
      totalTurn,
      currentTurn,
      extraTurn,
      gameGoodImpression,
      gameMotivation,
      gameFine,
      plusPlayCard,
      numOfDraw,
      startSkill,
      endSkill,
      beforeCardPlaySkill,
      afterCardPlaySkill,
    } = props;

    numOfDraw = this.calclateNumOfDraw(numOfDraw, 2);

    return {
      parameter,
      maxHp,
      currentHp,
      IncreasedEnergyConsumption,
      ReducedEnergyConsumption,
      gameParameterIncreace,
      gameParameterDecreace,
      totalTurn,
      currentTurn,
      extraTurn,
      gameGoodImpression,
      gameMotivation,
      gameFine,
      plusPlayCard,
      numOfDraw,
      startSkill,
      endSkill,
      beforeCardPlaySkill,
      afterCardPlaySkill,
    };
  }

  // 好印象の計算
  public calculateGoodImpression = (gameGoodImpression: number): number => {
    return this.goodImpression + gameGoodImpression;
  };

  // やる気の計算
  public calculateMotivation = (gameMotivation: number): number => {
    return this.motivation + gameMotivation;
  };

  // 元気の計算
  public calculateLogicFine = (
    gameMotivation: number,
    gameFine: number
  ): number => {
    return gameFine + gameMotivation + this.fine;
  };

  // 元気をn%消費
  public calclateConsumeFine = (
    gameFine: number,
    percentage
  ): ConsumeFineType => {
    let consumeF = Math.ceil(gameFine * (percentage / 100));
    gameFine -= consumeF;
    return { gameFine, consumeF };
  };

  // 元気のn%分パラメータ上昇
  public increaseParameterByFine = (
    props: LogicParameterProps,
    percentage: number
  ): number => {
    const {
      gameGoodImpression,
      gameMotivation,
      gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    } = props;
    let beforeParameter: number = this.parameter;
    this.parameter = Math.ceil(gameFine * (percentage / 100));
    let logicParameterProps: LogicParameterProps = {
      gameGoodImpression: gameGoodImpression,
      gameMotivation: gameMotivation,
      gameFine: gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    };
    let parameter: number = this.calclateParameter(logicParameterProps);
    this.parameter = beforeParameter;
    return parameter;
  };

  // 元気をn%消費して、減少前の元気のｍ%分パラメータ上昇
  public increaseParameterByFineConsumeFine = (
    props: LogicParameterProps,
    nPercent: number,
    mPercent: number
  ): ConsumeFineType => {
    let {
      gameGoodImpression,
      gameMotivation,
      gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    } = props;
    let ConsumeProps = this.calclateConsumeFine(gameFine, nPercent);
    gameFine = ConsumeProps["gameFine"];
    let beforeParameter: number = this.parameter;
    this.parameter = ConsumeProps["consumeF"] * (mPercent / 100);
    let logicParameterProps: LogicParameterProps = {
      gameGoodImpression: gameGoodImpression,
      gameMotivation: gameMotivation,
      gameFine: gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    };
    let parameter: number = this.calclateParameter(logicParameterProps);
    this.parameter = beforeParameter;
    let consumeF = ConsumeProps["consumeF"];
    return { gameFine, consumeF, parameter };
  };

  // やる気のn%分パラメータ上昇
  public increaseParameterByMotivation = (
    props: LogicParameterProps,
    percentage: number
  ): number => {
    const {
      gameGoodImpression,
      gameMotivation,
      gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    } = props;
    let beforeParameter: number = this.parameter;
    this.parameter = Math.ceil(gameMotivation * (percentage / 100));
    let logicParameterProps: LogicParameterProps = {
      gameGoodImpression: gameGoodImpression,
      gameMotivation: gameMotivation,
      gameFine: gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    };
    let parameter = this.calclateParameter(logicParameterProps);
    this.parameter = beforeParameter;
    return parameter;
  };

  // 好印象のn%分パラメータ上昇
  public increaseParameterByGoodImpression = (
    props: LogicParameterProps,
    percentage: number
  ): number => {
    const {
      gameGoodImpression,
      gameMotivation,
      gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    } = props;
    let beforeParameter: number = this.parameter;
    this.parameter = Math.ceil(gameGoodImpression * (percentage / 100));
    let logicParameterProps: LogicParameterProps = {
      gameGoodImpression: gameGoodImpression,
      gameMotivation: gameMotivation,
      gameFine: gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    };
    let parameter = this.calclateParameter(logicParameterProps);
    this.parameter = beforeParameter;
    return parameter;
  };

  // パラメータ上昇量（通常）
  public calclateParameter(props: LogicParameterProps): number {
    const {
      gameGoodImpression,
      gameMotivation,
      gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    } = props;
    return (
      this.parameter *
      this.changeParameterIncreaceToPercent(gameParameterIncreace) *
      this.changeParameterDecreaceToPercent(gameParameterDecreace)
    );
  }

  // ターン開始時スキルの追加
  public addStartSkill(
    gameStartSkill: Array<LogicSkillProps>,
    name: string,
    type: SkillType,
    trun: number,
    count: number,
    condition: string,
    startskill: (props: LogicProps) => LogicProps
  ): Array<LogicSkillProps> {
    const skill = startskill;
    const startSkill = { name, type, trun, count, condition, skill };
    gameStartSkill.push(startSkill);
    return gameStartSkill;
  }

  // ターン終了時スキルの追加
  public addEndSkill(
    gameEndSkill: Array<LogicSkillProps>,
    name: string,
    type: SkillType,
    trun: number,
    count: number,
    condition: string,
    endskill: (props: LogicProps) => LogicProps
  ): Array<LogicSkillProps> {
    const skill = endskill;
    const endSkill = { name, type, trun, count, condition, skill };
    gameEndSkill.push(endSkill);
    return gameEndSkill;
  }
  // カードプレイ前スキルの追加
  public addBeforeCardPlaySkill(
    gameBeforeCardPlaySkill: Array<LogicSkillProps>,
    name: string,
    type: SkillType,
    trun: number,
    count: number,
    condition: string,
    beforeCardPlayskill: (props: LogicProps) => LogicProps
  ): Array<LogicSkillProps> {
    const skill = beforeCardPlayskill;
    const beforeCardPlaySkill = { name, type, trun, count, condition, skill };
    gameBeforeCardPlaySkill.push(beforeCardPlaySkill);
    return gameBeforeCardPlaySkill;
  }
  // カードプレイスキルの追加
  public addAfterCardPlaySkill(
    gameAfterCardPlaySkill: Array<LogicSkillProps>,
    name: string,
    type: SkillType,
    trun: number,
    count: number,
    condition: string,
    AfterCardPlayskill: (props: LogicProps) => LogicProps
  ): Array<LogicSkillProps> {
    const skill = AfterCardPlayskill;
    const afterCardPlaySkill = { name, type, trun, count, condition, skill };
    gameAfterCardPlaySkill.push(afterCardPlaySkill);
    return gameAfterCardPlaySkill;
  }
}
