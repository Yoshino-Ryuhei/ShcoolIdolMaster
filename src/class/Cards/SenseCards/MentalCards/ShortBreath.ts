import { LogicProps } from "../../../../types/LogicProps.ts";
import { SenseCardInformation } from "../../../../types/SenseCardInformation.ts";
import { SenseParameterProps } from "../../../../types/SenseParameterProps.ts";
import { SenseProps } from "../../../../types/SenseProps.ts";
import { SenseCard } from "../../../PrimaryCards/SenseCard.ts";

export class ShortBreath extends SenseCard {
    constructor(grade:number){
        const gradeList:Array<SenseCardInformation> = [
                {
                    plan:"Sense",
                    type:"Mental", 
                    name:"ひと呼吸", 
                    desc:"ひと呼吸だよ",
                    cost:7,
                    parameter:0,
                    parameterCount:1,
                    fine:0,
                    onlyOnce:true, 
                    favorable:3, 
                    concentration:4,
                    perfectForm:0,
                    // 絶対ベストプラクティスじゃない...
                    applySenseEffect:(props:SenseProps) => {return props},
                    applyLogicEffect:(props:LogicProps) => {return props}
                },
                {
                    plan:"Sense",
                    type:"Mental", 
                    name:"ひと呼吸+", 
                    desc:"ひと呼吸+だよ",
                    cost:7,
                    parameter:0,
                    parameterCount:1,
                    fine:0,
                    onlyOnce:true, 
                    favorable:4, 
                    concentration:5,
                    perfectForm:0,
                    // 絶対ベストプラクティスじゃない...
                    applySenseEffect:(props:SenseProps) => {return props},
                    applyLogicEffect:(props:LogicProps) => {return props}
                },
            ]
            
            super(gradeList[grade]["plan"],
                gradeList[grade]["type"], 
                gradeList[grade]["name"], 
                grade, 
                gradeList[grade]["desc"], 
                gradeList[grade]["cost"], 
                gradeList[grade]["parameter"], 
                gradeList[grade]["parameterCount"], 
                gradeList[grade]["fine"], 
                gradeList[grade]["onlyOnce"], 
                gradeList[grade]["favorable"], 
                gradeList[grade]["concentration"], 
                gradeList[grade]["perfectForm"],
                gradeList)
            
            // カードの効果をgradeListに入れる
            for(let i = 0; i < this.gradeList.length; i++){
                this.gradeList[i]["applySenseEffect"] = this.applySenseEffect
                this.gradeList[i]["applyLogicEffect"] = this.applyLogicEffect
            }
    }
    
    // カードの効果を実行(センス)
    public applySenseEffect(props: SenseProps): SenseProps {
        let {parameter, maxHp, currentHp, IncreasedEnergyConsumption, ReducedEnergyConsumption, gameParameterIncreace, gameParameterDecreace, totalTurn, currentTurn, extraTurn, gameFavorable, gameConcentration, gamePerfectForm, gameFine, plusPlayCard, numOfDraw, startSkill, endSkill} = props
    
        let {gH, gF,iEC,rEC} = this.calclateHp({gH:currentHp,gF:gameFine,iEC:IncreasedEnergyConsumption,rEC:ReducedEnergyConsumption})
        currentHp = gH
        gameFine = gF
        if(currentHp< 0){
            alert("short of hp!")
            return {parameter, maxHp, currentHp, IncreasedEnergyConsumption, ReducedEnergyConsumption, gameParameterIncreace, gameParameterDecreace, totalTurn, currentTurn, extraTurn, gameFavorable, gameConcentration, gamePerfectForm, gameFine, plusPlayCard, numOfDraw, startSkill, endSkill}
        }

        let senseparameterProps: SenseParameterProps = {
            gameFavorable:gameFavorable, 
            gameConcentration:gameConcentration, 
            gamePerfectForm:gamePerfectForm,
            gameParameterIncreace,
            gameParameterDecreace,
            favorableEffect:1,
            concentratedEffect:1,
        } 

        for(let i = 0; i < this.parameterCount; i++){
            parameter += this.calclateParameter(senseparameterProps)
        }

        gameFavorable = this.calculateFavorable(gameFavorable)
        gameConcentration = this.calculateConcentration(gameConcentration)
        gamePerfectForm = this.calculatePerfectForm(gamePerfectForm)
        
        return  {parameter, maxHp, currentHp, IncreasedEnergyConsumption, ReducedEnergyConsumption, gameParameterIncreace, gameParameterDecreace, totalTurn, currentTurn, extraTurn, gameFavorable, gameConcentration, gamePerfectForm, gameFine, plusPlayCard, numOfDraw,startSkill, endSkill}
    }

    // カードの効果を実行(ロジック)
    public applyLogicEffect = (props:LogicProps): LogicProps => {
        return props
    }

    public copyCard():SenseCard {
        return new ShortBreath(this.grade)
    }
}