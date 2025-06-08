import { Game } from "./Game.ts";
import { LogicProps } from "../../types/LogicProps.ts";
import { deckType } from "../../types/deckType.ts";
import { Plan } from "../../types/Plan.ts";
import { LogicSkillProps } from "../../types/LogicSkillProps.ts";

export class LogicGame extends Game {
  // 好印象
  public gameGoodImpression: number;
  // やる気
  public gameMotivation: number;
  // 元気
  public gameFine: number;

  // ターン効果
  public startSkills: Array<LogicSkillProps>;
  public endSkills: Array<LogicSkillProps>;
  public beforeCardPlaySkills: Array<LogicSkillProps>;
  public afterCardPlaySkills: Array<LogicSkillProps>;

  constructor(
    totalTurns: number,
    vocalTurns: number,
    danceTurns: number,
    visualTurns: number,
    vocal: number,
    dance: number,
    visual: number,
    maxHp: number,
    parameter: number,
    plan: Plan,
    deck: deckType
  ) {
    super(
      totalTurns,
      vocalTurns,
      danceTurns,
      visualTurns,
      vocal,
      dance,
      visual,
      maxHp,
      parameter,
      plan,
      deck
    );
    this.gameGoodImpression = 0;
    this.gameMotivation = 0;
    this.gameFine = 0;
    this.startSkills = [];
    this.endSkills = [];
    this.beforeCardPlaySkills = [];
    this.afterCardPlaySkills = [];
  }

  // n番目のカードをプレイ
  public async playOneCard(): Promise<boolean> {
    await this.waitSelectCard();
    // スキップ
    if (this.playCardNumber === -2) {
      this.playCardCount = 0;
      return true;
    }
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
    } = this.hands[this.playCardNumber].gradeList[
      this.hands[this.playCardNumber].grade
    ]["applyLogicEffect"].bind(this.hands[this.playCardNumber])({
      parameter: 0,
      maxHp: this.maxHp,
      currentHp: this.currentHp,
      totalTurn: this.totalTurns,
      currentTurn: this.currentTurn,
      IncreasedEnergyConsumption: this.IncreasedEnergyConsumption,
      ReducedEnergyConsumption: this.ReducedEnergyConsumption,
      gameParameterIncreace: this.parameterIncreace,
      gameParameterDecreace: this.parameterDecreace,
      extraTurn: this.extraTurn,
      gameGoodImpression: this.gameGoodImpression,
      gameMotivation: this.gameMotivation,
      gameFine: this.gameFine,
      plusPlayCard: 0,
      numOfDraw: 0,
      startSkill: [],
      endSkill: [],
      beforeCardPlaySkill: [],
      afterCardPlaySkill: [],
    });
    if (currentHp < 0) {
      return false;
    } else {
      console.log(parameter);
      this.parameter += this.calcparameter(parameter);
      console.log(this.parameter);
      this.currentHp = currentHp;
      this.currentTurn = currentTurn;
      this.IncreasedEnergyConsumption = IncreasedEnergyConsumption;
      this.ReducedEnergyConsumption = ReducedEnergyConsumption;
      this.parameterIncreace = gameParameterIncreace;
      this.parameterDecreace = gameParameterDecreace;
      this.extraTurn = extraTurn;
      this.gameGoodImpression = gameGoodImpression;
      this.gameMotivation = gameMotivation;
      this.gameFine = gameFine;
      this.playCardCount -= 1;
      this.drawCardsFromDeck(numOfDraw);
      this.playCardCount += plusPlayCard;
      if (startSkill.length > 0) {
        startSkill.forEach((skill) => this.startSkills.push(skill));
      }
      if (endSkill.length > 0) {
        endSkill.forEach((skill) => this.endSkills.push(skill));
      }
      if (beforeCardPlaySkill.length > 0) {
        beforeCardPlaySkill.forEach((skill) =>
          this.beforeCardPlaySkills.push(skill)
        );
      }
      if (afterCardPlaySkill.length > 0) {
        afterCardPlaySkill.forEach((skill) =>
          this.afterCardPlaySkills.push(skill)
        );
      }
      return true;
    }
  }

  // ターン開始時処理
  public async startTurn(): Promise<void> {
    // ターン開始処理
    if (this.isStartTurnFlag) {
      this.isStartTurnFlag = false;
      await this.delay(1000);
      if (this.startSkills.length > 0) {
        let LogicProps: LogicProps = {
          parameter: 0,
          maxHp: this.maxHp,
          currentHp: this.currentHp,
          IncreasedEnergyConsumption: this.IncreasedEnergyConsumption,
          ReducedEnergyConsumption: this.ReducedEnergyConsumption,
          gameParameterIncreace: this.parameterIncreace,
          gameParameterDecreace: this.parameterDecreace,
          totalTurn: this.totalTurns,
          currentTurn: this.currentTurn,
          extraTurn: this.extraTurn,
          gameGoodImpression: this.gameGoodImpression,
          gameMotivation: this.gameMotivation,
          gameFine: this.gameFine,
          plusPlayCard: 0,
          numOfDraw: 0,
          startSkill: [],
          endSkill: [],
          beforeCardPlaySkill: [],
          afterCardPlaySkill: [],
        };
        for (let i: number = 0; i < this.startSkills.length; i++) {
          LogicProps = this.startSkills[i]["skill"](LogicProps);
          this.startSkills[i]["trun"] > 0
            ? (this.startSkills[i]["trun"] -= 1)
            : (this.startSkills[i]["trun"] = this.startSkills[i]["trun"]);
          this.startSkills[i]["count"] > 0
            ? (this.startSkills[i]["count"] -= 1)
            : (this.startSkills[i]["count"] = this.startSkills[i]["count"]);
          if (
            this.startSkills[i]["trun"] === 0 ||
            this.startSkills[i]["count"] === 0
          ) {
            this.startSkills.splice(i);
          }
        }
        this.parameter += this.calcparameter(LogicProps["parameter"]);
        this.currentHp = LogicProps["currentHp"];
        this.IncreasedEnergyConsumption =
          LogicProps["IncreasedEnergyConsumption"];
        this.ReducedEnergyConsumption = LogicProps["ReducedEnergyConsumption"];
        this.parameterIncreace = LogicProps["gameParameterIncreace"];
        this.parameterIncreace = LogicProps["gameParameterDecreace"];
        this.gameGoodImpression = LogicProps["gameGoodImpression"];
        this.gameMotivation = LogicProps["gameMotivation"];
        this.gameFine = LogicProps["gameFine"];
        this.playCardCount += LogicProps["plusPlayCard"];
        this.drawCardsFromDeck(LogicProps["numOfDraw"]);
      }
    }
  }

  public async beforeCardPlay(): Promise<void> {
    if (this.beforeCardPlaySkills.length > 0) {
      this.debug("before play card");
      await this.delay(1000);
      let LogicProps: LogicProps = {
        parameter: 0,
        maxHp: this.maxHp,
        currentHp: this.currentHp,
        IncreasedEnergyConsumption: this.IncreasedEnergyConsumption,
        ReducedEnergyConsumption: this.ReducedEnergyConsumption,
        gameParameterIncreace: this.parameterIncreace,
        gameParameterDecreace: this.parameterDecreace,
        totalTurn: this.totalTurns,
        currentTurn: this.currentTurn,
        extraTurn: this.extraTurn,
        gameGoodImpression: this.gameGoodImpression,
        gameMotivation: this.gameMotivation,
        gameFine: this.gameFine,
        plusPlayCard: 0,
        numOfDraw: 0,
        startSkill: [],
        endSkill: [],
        beforeCardPlaySkill: [],
        afterCardPlaySkill: [],
      };
      for (let i: number = 0; i < this.beforeCardPlaySkills.length; i++) {
        LogicProps = this.beforeCardPlaySkills[i]["skill"](LogicProps);
        this.beforeCardPlaySkills[i]["trun"] > 0
          ? (this.beforeCardPlaySkills[i]["trun"] -= 1)
          : (this.beforeCardPlaySkills[i]["trun"] =
              this.beforeCardPlaySkills[i]["trun"]);
        this.beforeCardPlaySkills[i]["count"] > 0
          ? (this.beforeCardPlaySkills[i]["count"] -= 1)
          : (this.beforeCardPlaySkills[i]["count"] =
              this.beforeCardPlaySkills[i]["count"]);
        if (
          this.beforeCardPlaySkills[i]["trun"] === 0 ||
          this.beforeCardPlaySkills[i]["count"] === 0
        ) {
          this.beforeCardPlaySkills.splice(i);
        }
      }
      this.parameter += this.calcparameter(LogicProps["parameter"]);
      this.currentHp = LogicProps["currentHp"];
      this.IncreasedEnergyConsumption =
        LogicProps["IncreasedEnergyConsumption"];
      this.ReducedEnergyConsumption = LogicProps["ReducedEnergyConsumption"];
      this.parameterIncreace = LogicProps["gameParameterIncreace"];
      this.parameterIncreace = LogicProps["gameParameterDecreace"];
      this.gameGoodImpression = LogicProps["gameGoodImpression"];
      this.gameMotivation = LogicProps["gameMotivation"];
      this.gameFine = LogicProps["gameFine"];
      this.playCardCount += LogicProps["plusPlayCard"];
      this.drawCardsFromDeck(LogicProps["numOfDraw"]);
    }
  }

  public async afterCardPlay(): Promise<void> {
    if (this.afterCardPlaySkills.length > 0) {
      await this.delay(1000);
      let LogicProps: LogicProps = {
        parameter: 0,
        maxHp: this.maxHp,
        currentHp: this.currentHp,
        IncreasedEnergyConsumption: this.IncreasedEnergyConsumption,
        ReducedEnergyConsumption: this.ReducedEnergyConsumption,
        gameParameterIncreace: this.parameterIncreace,
        gameParameterDecreace: this.parameterDecreace,
        totalTurn: this.totalTurns,
        currentTurn: this.currentTurn,
        extraTurn: this.extraTurn,
        gameGoodImpression: this.gameGoodImpression,
        gameMotivation: this.gameMotivation,
        gameFine: this.gameFine,
        plusPlayCard: 0,
        numOfDraw: 0,
        startSkill: [],
        endSkill: [],
        beforeCardPlaySkill: [],
        afterCardPlaySkill: [],
      };
      for (let i: number = 0; i < this.afterCardPlaySkills.length; i++) {
        LogicProps = this.afterCardPlaySkills[i]["skill"](LogicProps);
        this.afterCardPlaySkills[i]["trun"] > 0
          ? (this.afterCardPlaySkills[i]["trun"] -= 1)
          : (this.afterCardPlaySkills[i]["trun"] =
              this.afterCardPlaySkills[i]["trun"]);
        this.afterCardPlaySkills[i]["count"] > 0
          ? (this.afterCardPlaySkills[i]["count"] -= 1)
          : (this.afterCardPlaySkills[i]["count"] =
              this.afterCardPlaySkills[i]["count"]);
        if (
          this.afterCardPlaySkills[i]["trun"] === 0 ||
          this.afterCardPlaySkills[i]["count"] === 0
        ) {
          this.afterCardPlaySkills.splice(i);
        }
      }
      this.parameter += this.calcparameter(LogicProps["parameter"]);
      this.currentHp = LogicProps["currentHp"];
      this.IncreasedEnergyConsumption =
        LogicProps["IncreasedEnergyConsumption"];
      this.ReducedEnergyConsumption = LogicProps["ReducedEnergyConsumption"];
      this.parameterIncreace = LogicProps["gameParameterIncreace"];
      this.parameterIncreace = LogicProps["gameParameterDecreace"];
      this.gameGoodImpression = LogicProps["gameGoodImpression"];
      this.gameMotivation = LogicProps["gameMotivation"];
      this.gameFine = LogicProps["gameFine"];
      this.playCardCount += LogicProps["plusPlayCard"];
      this.drawCardsFromDeck(LogicProps["numOfDraw"]);
    }
  }

  public async endTurn(): Promise<void> {
    if (this.endSkills.length > 0) {
      await this.delay(1000);
      let LogicProps: LogicProps = {
        parameter: 0,
        maxHp: this.maxHp,
        currentHp: this.currentHp,
        IncreasedEnergyConsumption: this.IncreasedEnergyConsumption,
        ReducedEnergyConsumption: this.ReducedEnergyConsumption,
        gameParameterIncreace: this.parameterIncreace,
        gameParameterDecreace: this.parameterDecreace,
        totalTurn: this.totalTurns,
        currentTurn: this.currentTurn,
        extraTurn: this.extraTurn,
        gameGoodImpression: this.gameGoodImpression,
        gameMotivation: this.gameMotivation,
        gameFine: this.gameFine,
        plusPlayCard: 0,
        numOfDraw: 0,
        startSkill: [],
        endSkill: [],
        beforeCardPlaySkill: [],
        afterCardPlaySkill: [],
      };
      for (let i: number = 0; i < this.endSkills.length; i++) {
        LogicProps = this.endSkills[i]["skill"](LogicProps);
        this.endSkills[i]["trun"] > 0
          ? (this.endSkills[i]["trun"] -= 1)
          : (this.endSkills[i]["trun"] = this.endSkills[i]["trun"]);
        this.endSkills[i]["count"] > 0
          ? (this.endSkills[i]["count"] -= 1)
          : (this.endSkills[i]["count"] = this.endSkills[i]["count"]);
        if (
          this.endSkills[i]["trun"] === 0 ||
          this.endSkills[i]["count"] === 0
        ) {
          this.endSkills.splice(i);
        }
      }
      this.parameter += this.calcparameter(LogicProps["parameter"]);
      this.currentHp = LogicProps["currentHp"];
      this.IncreasedEnergyConsumption =
        LogicProps["IncreasedEnergyConsumption"];
      this.ReducedEnergyConsumption = LogicProps["ReducedEnergyConsumption"];
      this.parameterIncreace = LogicProps["gameParameterIncreace"];
      this.parameterIncreace = LogicProps["gameParameterDecreace"];
      this.gameGoodImpression = LogicProps["gameGoodImpression"];
      this.gameMotivation = LogicProps["gameMotivation"];
      this.gameFine = LogicProps["gameFine"];
      this.playCardCount += LogicProps["plusPlayCard"];
      this.drawCardsFromDeck(LogicProps["numOfDraw"]);
    }
    this.currentTurn += 1;
    this.isStartTurnFlag = true;
    this.gameGoodImpression
      ? (this.gameGoodImpression -= 1)
      : (this.gameGoodImpression = 0);
    this.IncreasedEnergyConsumption
      ? (this.IncreasedEnergyConsumption -= 1)
      : (this.IncreasedEnergyConsumption = 0);
    this.ReducedEnergyConsumption
      ? (this.ReducedEnergyConsumption -= 1)
      : (this.ReducedEnergyConsumption = 0);
    this.drawCardsAtTurnEnd(3);
  }

  // ターン処理
  public async oneTurn(): Promise<void> {
    // ターンを超過していたら処理しない
    if (this.totalTurns + this.extraTurn < this.currentTurn + 1) {
      return;
    }

    // ターン開始処理
    await this.startTurn();

    // カードプレイ前処理
    await this.beforeCardPlay();

    // カードプレイ処理
    if (await this.playOneCard()) {
      this.debug("after play card");

      // スキップ=this.playplayCardNumber=-2
      if (this.playCardNumber === -2) {
        this.playCardNumber = -1;
      } else {
        // カードプレイ後処理
        await this.afterCardPlay();

        if (this.hands[this.playCardNumber].onlyOnce) {
          this.moveHandToExclude(this.playCardNumber);
        } else {
          this.moveHandToDiscard(this.playCardNumber);
        }
        this.playCardNumber = -1;
        this.debug("after trush");
      }
    } else {
      alert("Can't play Card!");
      this.playCardNumber = -1;
      this.oneTurn();
      return;
    }

    if (this.isChangeTurn()) {
      this.debug("turn end");
      // エンド処理
      await this.endTurn();
    }

    // 最後のターンでなければ、もう一度初めから
    if (this.totalTurns + this.extraTurn >= this.currentTurn + 1) {
      this.oneTurn();
    } else {
      return;
    }
  }

  public resetLogicGame() {
    this.resetGame();
    this.gameGoodImpression = 10;
    this.gameMotivation = 10;
    this.gameFine = 10;
    this.startSkills = [];
    this.endSkills = [];
    this.beforeCardPlaySkills = [];
    this.afterCardPlaySkills = [];
  }
}
