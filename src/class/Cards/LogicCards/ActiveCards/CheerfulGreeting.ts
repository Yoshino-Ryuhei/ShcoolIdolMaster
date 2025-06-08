import { LogicCard } from "../../../PrimaryCards/LogicCard.ts";
import { SenseProps } from "../../../../types/SenseProps.ts";
import { LogicProps } from "../../../../types/LogicProps.ts";
import { LogicParameterProps } from "../../../../types/LogicParameterProps.ts";
import { LogicCardInformation } from "../../../../types/LogicCardInformation.ts";

export class CheerfulGreeting extends LogicCard {
  constructor(grade: number) {
    const gradeList: Array<LogicCardInformation> = [
      {
        plan: "Logic",
        type: "Active",
        name: "元気な挨拶",
        desc: "元気な挨拶だよ",
        cost: 4,
        parameter: 0,
        parameterCount: 1,
        fine: 0,
        onlyOnce: true,
        goodImpression: 0,
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
        name: "元気な挨拶+",
        desc: "元気な挨拶+だよ",
        cost: 3,
        parameter: 0,
        parameterCount: 1,
        fine: 0,
        onlyOnce: true,
        goodImpression: 0,
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

    let { gH, gF, iEC, rEC } = this.calclateOnlyHp({
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
    for (let i = 0; i < this.parameterCount; i++) {
      parameter += this.parameter;
    }

    let logicParameterProps: LogicParameterProps = {
      gameGoodImpression: gameGoodImpression,
      gameMotivation: gameMotivation,
      gameFine: gameFine,
      gameParameterIncreace,
      gameParameterDecreace,
    };
    parameter += this.increaseParameterByFine(logicParameterProps, 110);
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
    return new CheerfulGreeting(this.grade);
  }
}
