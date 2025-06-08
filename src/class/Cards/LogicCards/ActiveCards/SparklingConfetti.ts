import { LogicCard } from "../../../PrimaryCards/LogicCard.ts";
import { SenseProps } from "../../../../types/SenseProps.ts";
import { LogicProps } from "../../../../types/LogicProps.ts";
import { LogicParameterProps } from "../../../../types/LogicParameterProps.ts";
import { LogicCardInformation } from "../../../../types/LogicCardInformation.ts";

export class SparklingCofetti extends LogicCard {
  constructor(grade: number) {
    const gradeList: Array<LogicCardInformation> = [
      {
        plan: "Logic",
        type: "Active",
        name: "きらきら紙吹雪",
        desc: "きらきら紙吹雪だよ",
        cost: 0,
        parameter: 0,
        parameterCount: 1,
        fine: 0,
        onlyOnce: false,
        goodImpression: 0,
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
        type: "Active",
        name: "きらきら紙吹雪+",
        desc: "きらきら紙吹雪+だよ",
        cost: 0,
        parameter: 0,
        parameterCount: 1,
        fine: 0,
        onlyOnce: false,
        goodImpression: 0,
        motivation: -2,
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
      result = this.applyLogicEffectChangeByCount(props, 1);
    } else if (this.grade === 1) {
      result = this.applyLogicEffectChangeByCount(props, 2);
    } else {
      result = props;
    }
    return result;
  };

  // カードの効果処理本体
  public applyLogicEffectChangeByCount = (
    props: LogicProps,
    count: number
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

    let logicParameterProps: LogicParameterProps = {
      gameGoodImpression: gameGoodImpression,
      gameMotivation: gameMotivation,
      gameFine: gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    };

    parameter = this.increaseParameterByFine(logicParameterProps, 110);
    if (count === 1) {
      startSkill = [
        ...this.addStartSkill(
          startSkill,
          "きらきら紙吹雪",
          "Skill",
          1,
          -1,
          "any",
          this.calclateNextOneDraw.bind(this)
        ),
      ];
    } else if (count === 2) {
      startSkill = [
        ...this.addStartSkill(
          startSkill,
          "きらきら紙吹雪",
          "Skill",
          1,
          -1,
          "any",
          this.calclateNextTwoDraw.bind(this)
        ),
      ];
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
    return new SparklingCofetti(this.grade);
  }
}
