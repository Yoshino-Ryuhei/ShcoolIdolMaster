import { CardType } from "../../types/CardType.ts";
import { Plan } from "../../types/Plan.ts";
import { SenseCardInformation } from "../../types/SenseCardInformation.ts";
import { SenseParameterProps } from "../../types/SenseParameterProps.ts";
import { SenseProps } from "../../types/SenseProps.ts";
import { Card } from "./Card.ts";

export abstract class SenseCard extends Card {
    // 好調
    public favorable:number
    // 集中
    public concentration:number
    // 絶好調
    public perfectForm:number
    // 強化用情報保持リスト
    public gradeList:Array<SenseCardInformation>

    constructor(plan: Plan, 
                type: CardType, 
                name: string, 
                grade:number,
                desc: string, 
                cost: number,
                parameter: number,
                parameterCount:number,
                fine: number,
                onlyOnce: boolean,
                favorable: number, 
                concentration: number,
                perfectForm: number,
                gradeList:Array<SenseCardInformation>){
        super(plan, type, name, grade, desc, cost, parameter, parameterCount, fine, onlyOnce)
        this.favorable = favorable
        this.concentration = concentration
        this.perfectForm = perfectForm
        this.fine = fine
        this.gradeList = [...gradeList]
    }

    // カードの効果を実行
    abstract applySenseEffect(prop:SenseProps): SenseProps

    // カードのグレードを変換
    public changeSenseCardInformation() {
        this.name = this.gradeList[this.grade]["name"]
        this.desc = this.gradeList[this.grade]["desc"]
        this.cost = this.gradeList[this.grade]["cost"]
        this.parameter = this.gradeList[this.grade]["parameter"]
        this.parameterCount = this.gradeList[this.grade]["parameterCount"]
        this.fine = this.gradeList[this.grade]["fine"]
        this.onlyOnce = this.gradeList[this.grade]["onlyOnce"]
        this.favorable = this.gradeList[this.grade]["favorable"]
        this.concentration = this.gradeList[this.grade]["concentration"]
        this.perfectForm = this.gradeList[this.grade]["perfectForm"]
    }

    // カードをアップグレード
    public upgradeSenseCard() {
        if(this.grade >= this.gradeList.length - 1){
            alert("Can't Upgrade!")
        }else{
            this.grade += 1
            this.changeSenseCardInformation()
        }
    }

    // カードをダウングレード
    public downgradeSenseCard() {
        if(this.grade <= 0){
            alert("Can't Upgrade!")
        }else{
            this.grade -= 1
            this.changeSenseCardInformation()
        }
    }

    // 好調の計算
    public calculateFavorable = (gameFavorable:number):number => {
        return this.favorable + gameFavorable
    }

    // 集中の計算
    public calculateConcentration = (gameConcentration:number):number => {
        return this.concentration + gameConcentration
    }

    // 好調の消費
    public calculateFavorableConsumption = (gameFavorable:number, consumption:number):number => {
        return this.favorable + gameFavorable - consumption
    }

    // 集中の消費
    public calculateConcentrationConsumption = (gameConcentration:number, consumption:number):number => {
        return this.concentration + gameConcentration - consumption
    }

    // 絶好調の計算
    public calculatePerfectForm = (gamePerfectForm:number) => {
        return this.perfectForm + gamePerfectForm
    }

    // 元気の計算
    public calculateSenseFine = (gameMotivation:number, gameFine:number):number => {
        return gameFine + gameMotivation + this.fine
    }

    // ダメージの計算(通常)
    public calclateParameter(props:SenseParameterProps): number{
        const {gameFavorable, gameConcentration, gamePerfectForm, gameParameterIncreace, gameParameterDecreace, favorableEffect, concentratedEffect} = props
        let parameter:number = 0
        if(concentratedEffect){
            parameter = this.parameter + Math.ceil(gameConcentration * concentratedEffect)
        }else{
            parameter = this.parameter + gameConcentration
        }

        // 好調倍率の計算式分からん！！！
        if(gameFavorable){
            if(gamePerfectForm){
                parameter = parameter * (1.5 + 0.1 * gameFavorable)
            }else{
                parameter = parameter * 1.5
            }
        }

        return Math.ceil(parameter * this.changeParameterIncreaceToPercent(gameParameterIncreace) * this.changeParameterDecreaceToPercent(gameParameterDecreace))
    }

    // 好調のn%パラメータ分パラメータ上昇
    public increaseParameterByFavorable(props:SenseParameterProps, percentage:number): number{
        const {gameFavorable, gameConcentration, gamePerfectForm, gameParameterIncreace, gameParameterDecreace, favorableEffect, concentratedEffect} = props
        let parameter:number = this.parameter
        this.parameter = Math.ceil(gameFavorable * (percentage / 100))
        let senseparameterProps:SenseParameterProps = {
            gameFavorable:gameFavorable, 
            gameConcentration:gameConcentration, 
            gamePerfectForm:gamePerfectForm,
            gameParameterIncreace,
            gameParameterDecreace,
            favorableEffect:1,
            concentratedEffect:1,
        } 
        parameter = this.calclateParameter(senseparameterProps)
        this.parameter = parameter
        return parameter
    }
}