import { LogicCard } from "../../../PrimaryCards/LogicCard.ts"
import { SenseProps } from "../../../../types/SenseProps.ts";
import { LogicProps } from "../../../../types/LogicProps.ts";
import { LogicParameterProps } from "../../../../types/LogicParameterProps.ts";
import { LogicCardInformation } from "../../../../types/LogicCardInformation.ts";

export class Smile200 extends LogicCard {
    constructor(grade:number){
        const gradeList:Array<LogicCardInformation> = [
            {
                plan:"Logic",
                type:"Active" , 
                name:"200%スマイル", 
                desc:"200%スマイルだよ",
                cost:6,
                parameter:0,
                parameterCount:1,
                fine:0,
                onlyOnce:true, 
                goodImpression:5,
                motivation:0,
                // 絶対ベストプラクティスじゃない...
                applySenseEffect:(props:SenseProps) => {return props},
                applyLogicEffect:(props:LogicProps) => {return props}
            },
            {
                plan:"Logic",
                type:"Active" , 
                name:"200%スマイル+", 
                desc:"200%スマイル+だよ",
                cost:6,
                parameter:0,
                parameterCount:1,
                fine:0,
                onlyOnce:true, 
                goodImpression:6,
                motivation:0,
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
            gradeList[grade]["goodImpression"], 
            gradeList[grade]["motivation"], 
            gradeList)

        // カードの効果をgradeListに入れる
        for(let i = 0; i < this.gradeList.length; i++){
            this.gradeList[i]["applySenseEffect"] = this.applySenseEffect
            this.gradeList[i]["applyLogicEffect"] = this.applyLogicEffect
        }
    }

    // カードの効果を実行
    public applyLogicEffect = (props:LogicProps): LogicProps => {
        let result: LogicProps;
        if(this.grade === 0){
            result = this.applyLogicEffectChangeByPercent(props, 100)
        }else if(this.grade === 1){
            result = this.applyLogicEffectChangeByPercent(props, 170)
        }else{
            result = props
        }
        return  result
    }

    // カードの効果処理本体
    public applyLogicEffectChangeByPercent = (props:LogicProps, percentage:number): LogicProps => {
        let {parameter, 
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
            afterCardPlaySkill
        } = props

        let {gH, gF, iEC, rEC} = this.calclateOnlyHp({gH:currentHp,gF:gameFine,iEC:IncreasedEnergyConsumption,rEC:ReducedEnergyConsumption})
        currentHp = gH
        gameFine = gF
        if(currentHp< 0){
            alert("short of hp!")
            return {parameter, 
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
                afterCardPlaySkill
            }
        }

        gameGoodImpression = this.calculateGoodImpression(gameGoodImpression)
        let logicParameterProps:LogicParameterProps = {
                            gameGoodImpression:gameGoodImpression,
                            gameMotivation:gameMotivation,
                            gameFine:gameFine,
                            gameParameterIncreace,
                            gameParameterDecreace,
                        }
        parameter += this.increaseParameterByGoodImpression(logicParameterProps, percentage)
        return  {parameter, 
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
            afterCardPlaySkill
        }
    }

    public applySenseEffect(prop: SenseProps): SenseProps {
        return prop
    }

    public copyCard():LogicCard {
        return new Smile200(this.grade)
    }
}