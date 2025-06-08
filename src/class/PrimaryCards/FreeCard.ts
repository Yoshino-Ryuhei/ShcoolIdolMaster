import { Card } from "./Card.ts";
import { LogicProps } from "../../types/LogicProps.ts";
import { SenseProps } from "../../types/SenseProps.ts";
import { Plan } from "../../types/Plan.ts";
import { CardType } from "../../types/CardType.ts";
import { FreeCardInformation } from "../../types/FreeCardInformation.ts";

export abstract class FreeCard extends Card {
    // 好調
    protected favorable: number
    // 集中
    protected concentration: number
    // 絶好調
    protected perfectForm: number
    // 好印象
    protected goodImpression: number
    // やる気
    protected motivation: number
    // 強化用情報保持リスト
    public gradeList:Array<FreeCardInformation>

    constructor(plan: Plan, 
                type: CardType, 
                name: string, 
                grade: number,
                desc: string, 
                cost: number,
                parameter: number,
                parameterCount: number,
                fine:number,
                onlyOnce: boolean,
                gradeList: Array<FreeCardInformation>
                ){
        super(plan, type, name, grade, desc, cost, parameter, parameterCount, fine, onlyOnce)
        this.favorable = 0
        this.concentration = 0
        this.perfectForm = 0
        this.goodImpression = 0
        this.motivation = 0
        this.gradeList = [...gradeList]
    }

    // センスの時の効果
    abstract applySenseEffect(prop:SenseProps): SenseProps

    // ロジックの時の効果
    abstract applyLogicEffect(prop:LogicProps): LogicProps

    // カードのグレードを変換
    public changeLogicCardInformation() {
        this.name = this.gradeList[this.grade]["name"]
        this.desc = this.gradeList[this.grade]["desc"]
        this.cost = this.gradeList[this.grade]["cost"]
        this.parameter = this.gradeList[this.grade]["parameter"]
        this.parameterCount = this.gradeList[this.grade]["parameterCount"]
        this.fine = this.gradeList[this.grade]["fine"]
        this.onlyOnce = this.gradeList[this.grade]["onlyOnce"]
    }

    // カードをアップグレード
    public upgradeLogicCard() {
        if(this.grade >= this.gradeList.length - 1){
            alert("Can't Upgrade!")
        }else{
            this.grade += 1
            this.changeLogicCardInformation()
        }
    }

    // カードをダウングレード
    public downgradeLogicCard() {
        if(this.grade <= 0){
            alert("Can't Upgrade!")
        }else{
            this.grade -= 1
            this.changeLogicCardInformation()
        }
    }

    // 元気の計算（センス）
    public calculateSenseFine = (gameFine:number):number => {
        return gameFine + this.fine
    }

    // 元気の計算(ロジック)
    public calculateLogicFine = (gameMotivation:number, gameFine:number):number => {
        return gameFine + gameMotivation + this.fine
    }

    // 元気のn%分パラメータ上昇
    public increaseparameterByFine = (fine:number, percentage:number):number => {
        return  Math.ceil(fine * (percentage / 100))
    }

    // やる気のn%分パラメータ上昇
    public increaseparameterByMotivation = (motivation:number, percentage:number):number => {
        return  Math.ceil(motivation * (percentage / 100))
    }
}