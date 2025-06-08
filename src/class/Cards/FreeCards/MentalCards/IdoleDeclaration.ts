import { FreeCard } from "../../../PrimaryCards/FreeCard.ts";
import { LogicProps } from "../../../../types/LogicProps.ts";
import { SenseProps } from "../../../../types/SenseProps.ts";
import { LogicCardInformation } from "../../../../types/LogicCardInformation.ts";
import { FreeCardInformation } from "../../../../types/FreeCardInformation.ts";

export class IdoleDeclaration extends FreeCard {
  constructor(grade: number) {
    const gradeList: Array<FreeCardInformation> = [
      {
        plan: "Free",
        type: "Mental",
        name: "アイドル宣言",
        desc: "アイドル宣言だよ",
        cost: 1,
        parameter: 0,
        parameterCount: 0,
        fine: 0,
        onlyOnce: true,
        // 絶対ベストプラクティスじゃない...
        applySenseEffect: (props: SenseProps) => {
          return props;
        },
        applyLogicEffect: (props: LogicProps) => {
          return props;
        },
      },
      {
        plan: "Free",
        type: "Mental",
        name: "アイドル宣言+",
        desc: "アイドル宣言+だよ",
        cost: 0,
        parameter: 0,
        parameterCount: 0,
        fine: 0,
        onlyOnce: true,
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
      gradeList
    );

    // カードの効果をgradeListに入れる
    for (let i = 0; i < this.gradeList.length; i++) {
      this.gradeList[i]["applySenseEffect"] = this.applySenseEffect;
      this.gradeList[i]["applyLogicEffect"] = this.applyLogicEffect;
    }
  }

  public applyLogicEffect(props: LogicProps): LogicProps {
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
    numOfDraw = this.calclateNumOfDraw(numOfDraw, 2);
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
  }

  public applySenseEffect(props: SenseProps): SenseProps {
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
      gameFavorable,
      gameConcentration,
      gamePerfectForm,
      gameFine,
      plusPlayCard,
      numOfDraw,
      startSkill,
      endSkill,
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
        gameFavorable,
        gameConcentration,
        gamePerfectForm,
        gameFine,
        plusPlayCard,
        numOfDraw,
        startSkill,
        endSkill,
      };
    }
    for (let i = 0; i < this.parameterCount; i++) {
      parameter += this.parameter;
    }
    numOfDraw = this.calclateNumOfDraw(numOfDraw, 2);
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
      gameFavorable,
      gameConcentration,
      gamePerfectForm,
      gameFine,
      plusPlayCard,
      numOfDraw,
      startSkill,
      endSkill,
    };
  }

  public copyCard(): FreeCard {
    return new IdoleDeclaration(this.grade);
  }
}
