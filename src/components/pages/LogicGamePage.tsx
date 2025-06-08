import React, { FC, memo, useEffect, useState } from "react";
import { LogicGame } from "../../class/Games/LogicGame.ts";
import { ImageTraining } from "../../class/Cards/LogicCards/MentalCards/ImageTraining.ts";
import { deckType } from "../../types/deckType.ts";
import { PrimaryCard } from "../atoms/PrimaryCard.tsx";
import { Eureka } from "../../class/Cards/LogicCards/ActiveCards/Eureka.ts";
import { CheerfulGreeting } from "../../class/Cards/LogicCards/ActiveCards/CheerfulGreeting.ts";
import { Eieioo } from "../../class/Cards/LogicCards/MentalCards/Eieioo.ts";
import { IdoleDeclaration } from "../../class/Cards/FreeCards/MentalCards/IdoleDeclaration.ts";
import { TVAppearance } from "../../class/Cards/FreeCards/MentalCards/TVAppearance.ts";
import { JustALittleMore } from "../../class/Cards/LogicCards/ActiveCards/JustALittleMore.ts";
import { ThePromiseAtThatTime } from "../../class/Cards/LogicCards/ActiveCards/ThePromiseOfThatTime.ts";
import { Dammy } from "../../class/Cards/FreeCards/MentalCards/Dammy.ts";
import { MiracleMagic } from "../../class/Cards/LogicCards/ActiveCards/MiracleMagic.ts";
import { IAmTheStar } from "../../class/Cards/LogicCards/MentalCards/IAmTheStar.ts";
import { RainbowDreamer } from "../../class/Cards/LogicCards/MentalCards/RainbowDreamer.ts";
import { Tokimeki } from "../../class/Cards/LogicCards/MentalCards/Tokimeki.ts";
import { HandwrittenMessag } from "../../class/Cards/LogicCards/MentalCards/HandwittenMessage.ts";
import { DeterminationAtTheEdgeOfNotebook } from "../../class/Cards/LogicCards/MentalCards/DeterminationAtTheEdgeOfTheNotebook.ts";
import { StardustSensation } from "../../class/Cards/LogicCards/MentalCards/StardustSensation.ts";
import { Convey } from "../../class/Cards/LogicCards/ActiveCards/Convey.ts";
import { Blooming } from "../../class/Cards/LogicCards/ActiveCards/Blooming.ts";
import { Smile200 } from "../../class/Cards/LogicCards/ActiveCards/Smile200.ts";
import { ToShiningYou } from "../../class/Cards/LogicCards/ActiveCards/ToShiningYou.ts";
import { SparklingCofetti } from "../../class/Cards/LogicCards/ActiveCards/SparklingConfetti.ts";
import { CannnotStopThink } from "../../class/Cards/LogicCards/MentalCards/CannotStopThink.ts";
import { GirlMind } from "../../class/Cards/LogicCards/MentalCards/GirlMind.ts";
import { LovelyWink } from "../../class/Cards/LogicCards/ActiveCards/LovelyWink.ts";

let deck:deckType = []
// let imageTraining = new ImageTraining(1)
// deck.push(imageTraining)
// let eureka = new Eureka(1)
// deck.push(eureka)
// let cheerfulGreeting = new CheerfulGreeting(1)
// deck.push(cheerfulGreeting)
// let eieioo = new Eieioo(1)
// deck.push(eieioo)
// let idoleDeclaration = new IdoleDeclaration(1)
// deck.push(idoleDeclaration)
let tvAppearance = new TVAppearance(1)
deck.push(tvAppearance)
// let justALittleMore = new JustALittleMore(1)
// deck.push(justALittleMore)
let thePromiseAtThatTime = new ThePromiseAtThatTime(1)
deck.push(thePromiseAtThatTime)
let dammy = new Dammy(0)
deck.push(dammy)
let miracleMagic = new MiracleMagic(1)
deck.push(miracleMagic)
let iAmTheStar = new IAmTheStar(1)
deck.push(iAmTheStar)
let rainbowDreamer = new RainbowDreamer(1)
deck.push(rainbowDreamer)
let tokimeki = new Tokimeki(0)
deck.push(tokimeki)
let handwrittenMessage = new HandwrittenMessag(1)
deck.push(handwrittenMessage)
let DATEON = new DeterminationAtTheEdgeOfNotebook(1)
deck.push(DATEON)
let toShiningYou = new ToShiningYou(1)
deck.push(toShiningYou)
let sparklingConfetti = new SparklingCofetti(0)
deck.push(sparklingConfetti)
let stardustSensation = new StardustSensation(1)
deck.push(stardustSensation)
let convey = new Convey(1)
deck.push(convey)
let blooming = new Blooming(0)
deck.push(blooming)
let smile200 = new Smile200(1)
deck.push(smile200)
let cannotStopThink = new CannnotStopThink(1)
deck.push(cannotStopThink)
let girlMind = new GirlMind(1)
deck.push(girlMind)
let lovelyWink = new LovelyWink(1)
deck.push(lovelyWink)

let mainGame = new LogicGame(
    12,
    5,
    4,
    3,
    1500,
    1500,
    500,
    30,
    0,
    "Logic",
    deck)
export const LogicGamePage:FC  = memo(() => {
    const [gameTurn, setGameTurn] = useState(mainGame.currentTurn)
    const [gameScore, setGameScore] = useState(mainGame.parameter)
    const [gamehp, setGamehp] = useState(mainGame.currentHp)
    const [gameGoodImpression, setGameGoodImpression] = useState(mainGame.gameGoodImpression)
    const [gameMotivation, setGameMotivation] = useState(mainGame.gameMotivation)
    const [gameFine, setGameFine] = useState(mainGame.gameFine)
    const [gamehands, setGameHands] = useState(mainGame.hands)

    const setGame = () => {
        setGameTurn(mainGame.currentTurn)
        setGameScore(mainGame.parameter)
        setGamehp(mainGame.currentHp)
        setGameGoodImpression(mainGame.gameGoodImpression)
        setGameMotivation(mainGame.gameMotivation)
        setGameFine(mainGame.gameFine)
        setGameHands([...mainGame.hands])
    }

    let turn
    switch (mainGame.turnList[gameTurn]){
        case "vocal":
            turn = mainGame.vocal
            break
        case "dance":
            turn = mainGame.dance
            break
        case "visual":
            turn = mainGame.visual
            break
        default:
            console.log(mainGame.turnList[gameTurn])
            break
    }
    return <>
    <div class={"stage"}>
        <div>{gameTurn+1}/{mainGame.totalTurns}+{mainGame.extraTurn}ターン目</div>
        <div>ターンの種類：{`${mainGame.turnList[gameTurn]}/${turn}%`}<button className={mainGame.turnList[gameTurn]}></button></div>
        <div>残りカード使用回数:{mainGame.playCardCount}</div>
        <div>score:{gameScore}</div>
        <div>hp:{gamehp}/{mainGame.maxHp}</div>
        <div>好印象:{gameGoodImpression}</div>
        <div>やる気:{gameMotivation}</div>
        <div>元気:{gameFine}</div>
        <div>体力消費増加:{mainGame.IncreasedEnergyConsumption}ターン</div>
        <div>体力消費減少:{mainGame.ReducedEnergyConsumption}ターン</div>
        <div>パラメータ上昇量上昇:{mainGame.parameterIncreace}%</div>
        <div>パラメータ上昇量減少:{mainGame.parameterDecreace}%</div>
        <button class={"skip"} onClick={() => {mainGame.playCardNumber = -2;setGame()}}>Skip</button>
        <button class={"reset"} onClick={() => {mainGame.resetLogicGame();setGame()}}>Reset</button>
    </div>
    <div class={"hands"}>{mainGame.hands.map((card, i) => (<PrimaryCard card={card} onClick={() => {mainGame.playCardNumber = i;setGame()}} key={i}/>))}</div>
    <button onClick={() => {mainGame.oneTurn();setGame()}}>Start Game</button>
    <button onClick={() => setGame()}>setGame</button>
    </>
})