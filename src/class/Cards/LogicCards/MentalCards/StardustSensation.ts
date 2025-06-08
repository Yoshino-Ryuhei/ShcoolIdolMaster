import { LogicCard } from "../../../PrimaryCards/LogicCard.ts";
import { SenseProps } from "../../../../types/SenseProps.ts";
import { LogicProps } from "../../../../types/LogicProps.ts";
import { LogicCardInformation } from "../../../../types/LogicCardInformation.ts";

export class StardustSensation extends LogicCard {
  constructor(grade: number) {
    const gradeList: Array<LogicCardInformation> = [
      {
        plan: "Logic",
        type: "Mental",
        name: "星屑センセーション",
        desc: "星屑センセーションだよ",
        cost: 0,
        parameter: 0,
        parameterCount: 1,
        fine: 0,
        onlyOnce: true,
        goodImpression: 5,
        motivation: -3,
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
        type: "Mental",
        name: "星屑センセーション+",
        desc: "星屑センセーション+だよ",
        cost: 0,
        parameter: 0,
        parameterCount: 1,
        fine: 0,
        onlyOnce: true,
        goodImpression: 7,
        motivation: -3,
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
      result = this.applyLogicEffectChangeByGrade0(props);
    } else if (this.grade === 1) {
      result = this.applyLogicEffectChangeByGrade1(props);
    } else {
      result = props;
    }
    return result;
  };

  // カードの効果処理本体(未強化)
  public applyLogicEffectChangeByGrade0 = (props: LogicProps): LogicProps => {
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

    let gM = this.calculateMotivation(gameMotivation);
    if (gM < 0) {
      alert("short of Motivation!");
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
      gameMotivation = gM;
    }

    gameGoodImpression = this.calculateGoodImpression(gameGoodImpression);
    plusPlayCard = this.calclatePlusPlayCard(plusPlayCard, 1);

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

  // カードの効果処理本体(強化1)
  public applyLogicEffectChangeByGrade1 = (props: LogicProps): LogicProps => {
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

    let gM = this.calculateMotivation(gameMotivation);
    if (gM < 0) {
      alert("short of Motivation!");
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
      gameMotivation = gM;
    }

    gameGoodImpression = this.calculateGoodImpression(gameGoodImpression);
    plusPlayCard = this.calclatePlusPlayCard(plusPlayCard, 1);
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
  };

  public applySenseEffect(prop: SenseProps): SenseProps {
    return prop;
  }

  public copyCard(): LogicCard {
    return new StardustSensation(this.grade);
  }
}
