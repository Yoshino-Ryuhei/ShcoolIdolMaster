import React, { FC, memo, useEffect, useState } from "react";
import { SenseGame } from "../../class/Games/SenseGame.ts";
import { PrimaryCard } from "../atoms/PrimaryCard.tsx";
import { ShortBreath } from "../../class/Cards/SenseCards/MentalCards/ShortBreath.ts";
import { Excite } from "../../class/Cards/SenseCards/ActiveCards/Excite.ts";
import { deckType } from "../../types/deckType.ts";
import { IdoleDeclaration } from "../../class/Cards/FreeCards/MentalCards/IdoleDeclaration.ts";
import { TVAppearance } from "../../class/Cards/FreeCards/MentalCards/TVAppearance.ts";
import { Dammy } from "../../class/Cards/FreeCards/MentalCards/Dammy.ts";

let deck:deckType = []
// let shortBreath =  new ShortBreath(0)
// deck.push(shortBreath)
// let excite = new Excite(1)
// excite.downgradeSenseCard()
// deck.push(excite)
// let idoleDeclaration = new IdoleDeclaration(1)
// deck.push(idoleDeclaration)
let tvAppearance = new TVAppearance(1)
deck.push(tvAppearance)
let dammy = new Dammy(0)
deck.push(dammy)

let mainGame = new SenseGame(
    12,
    5,
    4,
    3,
    1500,
    1500,
    500,
    30,
    0,
    "Sense",
    deck)

export const SenseGamePage:FC  = memo(() => {
    const [gameTurn, setGameTurn] = useState(mainGame.currentTurn)
    const [gameScore, setGameScore] = useState(mainGame.parameter)
    const [gamehp, setGamehp] = useState(mainGame.currentHp)
    const [gameFavorable, setGameFavorable] = useState(mainGame.gameFavorable)
    const [gameConcentration, setGameConcentration] = useState(mainGame.gameConcentration)
    const [gamePerfectForm, setGamePerfectForm] = useState(mainGame.gamePerfectForm)
    const [gameFine, setGameFine] = useState(mainGame.gameFine)
    const [gamehands, setGameHands] = useState(mainGame.hands)

    const setGame = () => {
        setGameTurn(mainGame.currentTurn)
        setGameScore(mainGame.parameter)
        setGamehp(mainGame.currentHp)
        setGameFavorable(mainGame.gameFavorable)
        setGameConcentration(mainGame.gameConcentration)
        setGamePerfectForm(mainGame.gamePerfectForm)
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
        <div>好調:{gameFavorable}</div>
        <div>集中:{gameConcentration}</div>
        <div>絶好調:{gamePerfectForm}</div>
        <div>元気:{gameFine}</div>
        <div>体力消費増加:{mainGame.IncreasedEnergyConsumption}ターン</div>
        <div>体力消費減少:{mainGame.ReducedEnergyConsumption}ターン</div>
        <div>パラメータ上昇量上昇:{mainGame.parameterIncreace}%</div>
        <div>パラメータ上昇量減少:{mainGame.parameterDecreace}%</div>
        <button class={"reset"} onClick={() => {mainGame.resetSenseGame();setGame()}}>Reset</button>
    </div>
    <div class={"hands"}>{mainGame.hands.map((card, i) => (<PrimaryCard card={card} onClick={() => {mainGame.oneTurn(i);setGame()}} key={i}/>))}</div>
    </>
})