import { LogicCard } from "../../../PrimaryCards/LogicCard.ts";
import { SenseProps } from "../../../../types/SenseProps.ts";
import { LogicProps } from "../../../../types/LogicProps.ts";
import { LogicCardInformation } from "../../../../types/LogicCardInformation.ts";

// 編集用
export class GirlMind extends LogicCard {
  constructor(grade: number) {
    const gradeList: Array<LogicCardInformation> = [
      {
        plan: "Logic",
        type: "Mental",
        name: "オトメゴコロ",
        desc: "オトメゴコロだよ",
        cost: 0,
        parameter: 0,
        parameterCount: 1,
        fine: 0,
        onlyOnce: false,
        goodImpression: 4,
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
        name: "オトメゴコロ+",
        desc: "オトメゴコロ+だよ",
        cost: 0,
        parameter: 0,
        parameterCount: 1,
        fine: 0,
        onlyOnce: false,
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

    if ((this, this.grade === 1 && gameGoodImpression >= 10)) {
      gameGoodImpression = gameGoodImpression + 2;
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
    return new GirlMind(this.grade);
  }
}
