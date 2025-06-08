import { LogicCard } from "../../../PrimaryCards/LogicCard.ts";
import { SenseProps } from "../../../../types/SenseProps.ts";
import { LogicProps } from "../../../../types/LogicProps.ts";
import { LogicParameterProps } from "../../../../types/LogicParameterProps.ts";
import { LogicCardInformation } from "../../../../types/LogicCardInformation.ts";

export class ThePromiseAtThatTime extends LogicCard {
  constructor(grade: number) {
    const gradeList: Array<LogicCardInformation> = [
      {
        plan: "Logic",
        type: "Active",
        name: "あのときの約束",
        desc: "あのときの約束だよ",
        cost: 0,
        parameter: 0,
        parameterCount: 1,
        fine: 9,
        onlyOnce: true,
        goodImpression: -4,
        motivation: 0,
        // 絶対ベストプラクティスじゃない...
        applySenseEffect: (props: SenseProps) => {
          return props;
        },
        applyLogicEffect: (props: LogicProps) => {
          return props;
        },
      },
      {
        plan: "Logic",
        type: "Active",
        name: "あのときの約束+",
        desc: "あのときの約束+だよ",
        cost: 0,
        parameter: 0,
        parameterCount: 1,
        fine: 14,
        onlyOnce: true,
        goodImpression: -4,
        motivation: 0,
        // 絶対ベストプラクティスじゃない...
        applySenseEffect: (props: SenseProps) => {
          return props;
        },
        applyLogicEffect: (props: LogicProps) => {
          return props;
        },
      },
    ];

    super(
      gradeList[grade]["plan"],
      gradeList[grade]["type"],
      gradeList[grade]["name"],
      grade,
      gradeList[grade]["desc"],
      gradeList[grade]["cost"],
      gradeList[grade]["parameter"],
      gradeList[grade]["parameterCount"],
      gradeList[grade]["fine"],
      gradeList[grade]["onlyOnce"],
      gradeList[grade]["goodImpression"],
      gradeList[grade]["motivation"],
      gradeList
    );

    // カードの効果をgradeListに入れる
    for (let i = 0; i < this.gradeList.length; i++) {
      this.gradeList[i]["applySenseEffect"] = this.applySenseEffect;
      this.gradeList[i]["applyLogicEffect"] = this.applyLogicEffect;
    }
  }

  // カードの効果を実行
  public applyLogicEffect = (props: LogicProps): LogicProps => {
    let result: LogicProps;
    if (this.grade === 0) {
      result = this.applyLogicEffectChangeByPercent(props, 100, 150);
    } else if (this.grade === 1) {
      result = this.applyLogicEffectChangeByPercent(props, 130, 200);
    } else {
      result = props;
    }
    return result;
  };

  // カードの効果処理本体
  public applyLogicEffectChangeByPercent = (
    props: LogicProps,
    finePercentage: number,
    motivationPercentage: number
  ): LogicProps => {
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

    let { gH, gF, iEC, rEC } = this.calclateHp({
      gH: currentHp,
      gF: gameFine,
      iEC: IncreasedEnergyConsumption,
      rEC: ReducedEnergyConsumption,
    });
    currentHp = gH;
    gameFine = gF;
    if (currentHp < 0) {
      alert("short of hp!");
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

    let gGI = this.calculateGoodImpression(gameGoodImpression);
    if (gGI < 0) {
      alert("short of Good Impression!");
      // currentHpを-1にして実質的にプレイさせない
      currentHp = -1;
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
    } else {
      gameGoodImpression = gGI;
    }
    gameFine = this.calculateLogicFine(gameMotivation, gameFine);
    let logicParameterProps: LogicParameterProps = {
      gameGoodImpression: gameGoodImpression,
      gameMotivation: gameMotivation,
      gameFine: gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    };
    for (let i = 0; i < this.parameterCount; i++) {
      parameter += this.increaseParameterByFine(
        logicParameterProps,
        finePercentage
      );
      parameter += this.increaseParameterByMotivation(
        logicParameterProps,
        motivationPercentage
      );
    }
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
  };

  public applySenseEffect(prop: SenseProps): SenseProps {
    return prop;
  }

  public copyCard(): LogicCard {
    return new ThePromiseAtThatTime(this.grade);
  }
}
