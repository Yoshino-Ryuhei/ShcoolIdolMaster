import { deckType } from "../../types/deckType.ts";
import { getRandomInt } from "../function/getRandomInt.ts";
import { Plan } from "../../types/Plan.ts";

type turnType = "vocal" | "dance" | "visual";
type vdvListType<TKey extends turnType, TValue> = {
  [key in TKey]: TValue;
};

export abstract class Game {
  // ターン
  public totalTurns: number;
  public currentTurn: number;
  public extraTurn: number;
  public vocalTurns: number;
  public danceTurns: number;
  public visualTurns: number;
  public isStartTurnFlag: boolean;
  public turnList: turnType[];
  public vdvDic: vdvListType<turnType, number>;

  // ボーカル、ダンス、ヴィジュアルはパーセント表記
  public vocal: number;
  public dance: number;
  public visual: number;

  // 体力やアイテムなど(アイテムは後回し)
  public maxHp: number;
  public currentHp: number;
  public IncreasedEnergyConsumption: number;
  public ReducedEnergyConsumption: number;
  public parameterIncreace: number;
  public parameterDecreace: number;
  public parameter: number;
  public plan: Plan;

  // デッキや手札
  public deck: deckType;
  public hands: deckType;
  public discard: deckType;
  public exclude: deckType;
  public playCardCount: number;
  public playCardNumber: number; // プレイヤーが選択した手札のカード番号(初期値-1)。非同期処理で必要

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
    this.totalTurns = totalTurns;
    this.currentTurn = 0;
    this.extraTurn = 0;
    this.vocalTurns = vocalTurns;
    this.danceTurns = danceTurns;
    this.visualTurns = visualTurns;
    this.isStartTurnFlag = true;
    this.vocal = vocal;
    this.dance = dance;
    this.visual = visual;
    this.maxHp = maxHp;
    this.currentHp = maxHp;
    this.IncreasedEnergyConsumption = 0;
    this.ReducedEnergyConsumption = 0;
    this.parameterIncreace = 0;
    this.parameterDecreace = 0;
    this.parameter = parameter;
    this.plan = plan;
    this.deck = deck;
    this.hands = [];
    this.discard = [];
    this.exclude = [];
    this.playCardCount = 1;
    this.vdvDic = {
      vocal: this.vocal,
      dance: this.dance,
      visual: this.visual,
    };
    this.playCardNumber = -1;

    this.setGame();
  }

  // ゲーム初期設定
  public setGame() {
    this.debug("before set game");
    this.decideTurnType();
    // this.debug("before set deck")
    this.resetDeck();
    // this.debug("after set deck")
    this.drawCardsFromDeck(3);
    this.debug("after set game");
  }

  // 山札をリセット
  public resetDeck = () => {
    let deck = [...this.deck];
    let hands = this.hands.length;
    let discard = this.discard.length;
    let exclude = this.exclude.length;
    console.log(deck);

    // 手札のカードを山札へ
    for (let i: number = 0; i < hands; i++) {
      deck.push(this.hands.pop()!);
    }
    console.log(deck);

    // 捨て札のカードを山札へ
    for (let i: number = 0; i < discard; i++) {
      deck.push(this.discard.pop()!);
    }
    console.log(deck);

    // 除外のカードを山札へ
    for (let i: number = 0; i < exclude; i++) {
      deck.push(this.exclude.pop()!);
    }
    console.log(deck);

    this.deck = [...deck];
  };

  // n枚山札からドロー
  public drawCardsFromDeck = (n: number) => {
    // 引くカードの枚数がデッキ枚数より少ないなら捨て札からデッキに移動させる
    if (this.deck.length === 0) {
      console.log("ccc");
      this.reFillDeckFromDiscard();
      this.shuffleDeck();
    }
    for (let i: number = 0; i < n; i++) {
      if (this.deck.length <= 0) {
        break;
      }
      this.hands.push(this.deck.pop()!);
      this.debug("drawCardsFromDeck");
    }
  };

  // 手札のn番目のカードを捨て札へ
  public moveHandToDiscard = (n: number) => {
    let card = this.hands.splice(n, 1)[0];
    if (!card.onlyOnce) {
      this.discard.push(card);
    }
  };

  // 手札のn番目のカードを除外へ
  public moveHandToExclude = (n: number) => {
    let card = this.hands.splice(n, 1)[0];
    if (card.onlyOnce) {
      this.exclude.push(card);
    }
  };

  // 山札をシャッフル
  public shuffleDeck = () => {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i);
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  };

  // デッキがなくなったとき、捨て札からデッキに戻す
  public reFillDeckFromDiscard = () => {
    let l = this.discard.length;
    if (this.deck.length === 0 && l > 0) {
      for (let i = 0; i < l; i++) {
        this.deck.push(this.discard.pop()!);
      }
    }
  };

  // ターンエンド時、カードを指定枚数分引く
  public drawCardsAtTurnEnd = (numOfDraw: number) => {
    this.debug("start draw at end");
    let beforeHands = [...this.hands];
    this.hands = [];
    for (let i = 0; i < numOfDraw; i++) {
      // 引くカードの枚数がデッキ枚数より少ないなら捨て札からデッキに移動させる
      if (this.deck.length === 0) {
        console.log("aaa");
        if (beforeHands.length > 0) {
          console.log("bbb");
          let numOFBeforeHandsCard = beforeHands.length;
          for (let i = 0; i < numOFBeforeHandsCard; i++) {
            this.discard.push(beforeHands.pop()!);
          }
        }
        this.reFillDeckFromDiscard();
        this.shuffleDeck();
      }
      this.drawCardsFromDeck(1);
      console.log(i);
      this.debug("draw 1 card");
    }
    if (beforeHands.length > 0) {
      let numOFBeforeHandsCard = beforeHands.length;
      for (let i = 0; i < numOFBeforeHandsCard; i++) {
        this.discard.push(beforeHands.pop()!);
      }
    }
  };

  // ターンの種類を決める
  private decideTurnType = () => {
    let turnList: turnType[] = [];

    // 1. オブジェクトを[キー, 値]のペアに変換
    let vdvArray = Object.entries(this.vdvDic) as Array<[turnType, number]>;

    // 2. 配列を値（number）を基準にソート
    vdvArray.sort((a, b) => a[1] - b[1]); // 小さい順にソート（昇順）

    // 3. ソート後、元のオブジェクト形式に戻す
    let sortedVdvDict: vdvListType<turnType, number> = Object.fromEntries(
      vdvArray
    ) as vdvListType<turnType, number>;
    this.vdvDic = sortedVdvDict;

    // 最初の3ターンは大きい順にターンを決める
    let entries = Object.entries(sortedVdvDict) as Array<[turnType, number]>;
    for (let i: number = 2; i >= 0; i--) {
      let [key, value]: [turnType, number] = entries[i];
      turnList.push(key);
    }

    //　間のターンはランダム
    let vocalTurns = this.vocalTurns;
    let danceTurns = this.danceTurns;
    let visualTurns = this.visualTurns;
    let dummyList: turnType[] = [];

    // それぞれのターン数が入った配列を用意
    for (let i = 0; i < vocalTurns - 2; i++) {
      dummyList.push("vocal");
    }
    for (let i = 0; i < danceTurns - 2; i++) {
      dummyList.push("dance");
    }
    for (let i = 0; i < visualTurns - 2; i++) {
      dummyList.push("visual");
    }

    // ランダムにシャッフル
    for (let i = dummyList.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i);
      [dummyList[i], dummyList[j]] = [dummyList[j], dummyList[i]];
    }

    // 代入
    for (let i = 0; i < dummyList.length; i++) {
      turnList.push(dummyList[i]);
    }

    // 最後の3ターンは小さい順にターンを決める
    for (let i: number = 0; i < 3; i++) {
      let [key, value]: [turnType, number] = entries[i];
      turnList.push(key);
    }

    this.turnList = turnList;
    console.log(this.turnList);
  };

  // ターンを進めるか判定
  public isChangeTurn = () => {
    if (this.playCardCount === 0) {
      this.playCardCount = 1;
      return true;
    } else if (this.playCardCount < 0) {
      alert("too many card play!");
      return false;
    } else {
      return false;
    }
  };

  public resetGame = () => {
    this.currentTurn = 0;
    this.extraTurn = 0;
    this.isStartTurnFlag = true;
    this.maxHp = this.maxHp;
    this.currentHp = this.maxHp;
    this.IncreasedEnergyConsumption = 0;
    this.ReducedEnergyConsumption = 0;
    this.parameter = 0;
    this.playCardCount = 1;

    this.setGame();
  };

  public vocalTurnAction = (parameter: number): number => {
    return Math.floor((parameter * this.vocal) / 100);
  };
  public danceTurnAction = (parameter: number): number => {
    return Math.floor((parameter * this.dance) / 100);
  };
  public visualTurnAction = (parameter: number): number => {
    return Math.floor((parameter * this.visual) / 100);
  };
  public calcparameter = (parameter: number): number => {
    switch (this.turnList[this.currentTurn]) {
      case "vocal":
        return this.vocalTurnAction(parameter);
      case "dance":
        return this.danceTurnAction(parameter);
      case "visual":
        return this.visualTurnAction(parameter);
      default:
        return 0;
    }
  };
  abstract playOneCard(n: number);
  abstract oneTurn(n: number);

  // デバッグ用　消す
  protected debug = (conmment?: string) => {
    if (conmment) {
      console.log(conmment);
    }
    console.log(this.hands);
    console.log(this.deck);
    console.log(this.discard);
    console.log(this.exclude);
  };

  // 非同期処理の遅延用
  protected async delay(ms: number): Promise<void> {
    console.log("delay");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // カード選択を待つ
  protected async waitSelectCard(): Promise<void> {
    return new Promise((resolve) => {
      const checkSelectCard = () => {
        if (this.playCardNumber !== -1) {
          resolve();
        } else {
          setTimeout(checkSelectCard, 100);
        }
      };
      checkSelectCard();
    });
  }
}
