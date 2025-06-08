import { Game } from "./Game.ts"
import { SenseProps } from "../../types/SenseProps.ts";
import { deckType } from "../../types/deckType.ts";
import { Plan } from "../../types/Plan.ts";

export class SenseGame extends Game {
    // 好調
    public gameFavorable:number
    // 集中
    public gameConcentration:number
    // 絶好調
    public gamePerfectForm:number
    // 元気
    public gameFine:number

    // ターン効果
    public startSkills:Array<(props:SenseProps) => SenseProps>
    public endSkills:Array<(props:SenseProps) => SenseProps>

    constructor(
        totalTurns:number,
        vocalTurns:number,
        danceTurns:number,
        visualTurns:number,
        vocal:number,
        dance:number,
        visual:number,
        maxHp:number,
        parameter:number,
        plan:Plan,
        deck:deckType
    ){
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
        )
        this.gameFavorable = 0
        this.gameConcentration = 0
        this.gamePerfectForm = 0
        this.gameFine = 0
        this.startSkills = []
        this.endSkills = []
    }

    public playOneCard = (n:number):boolean => {
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
            gameFavorable, 
            gameConcentration, 
            gamePerfectForm,
            gameFine,
            plusPlayCard,
            numOfDraw,
            startSkill,
            endSkill
        }
        = this.hands[n].gradeList[this.hands[n].grade]["applySenseEffect"].bind(this.hands[n])(
            {parameter:0, 
            maxHp:this.maxHp,
            currentHp:this.currentHp,
            totalTurn:this.totalTurns,
            currentTurn:this.currentTurn,
            IncreasedEnergyConsumption:this.IncreasedEnergyConsumption,
            ReducedEnergyConsumption:this.ReducedEnergyConsumption,
            gameParameterIncreace:this.parameterIncreace,
            gameParameterDecreace:this.parameterDecreace,
            extraTurn:this.extraTurn,
            gameFavorable:this.gameFavorable, 
            gameConcentration:this.gameConcentration, 
            gamePerfectForm:this.gamePerfectForm,
            gameFine:this.gameFine,
            plusPlayCard:0,
            numOfDraw:0,
            startSkill:[],
            endSkill:[]
        })
        if(currentHp < 0){
            return false
        }else{
            console.log(parameter)
            this.parameter += this.calcparameter(parameter)
            console.log(this.parameter)
            this.currentHp = currentHp
            this.currentTurn = currentTurn
            this.IncreasedEnergyConsumption = IncreasedEnergyConsumption
            this.ReducedEnergyConsumption = ReducedEnergyConsumption
            this.parameterIncreace = this.parameterIncreace
            this.parameterDecreace = this.parameterDecreace
            this.extraTurn = extraTurn
            this.gameFavorable = gameFavorable
            this.gameConcentration = gameConcentration
            this.gamePerfectForm = gamePerfectForm
            this.gameFine = gameFine
            this.playCardCount -= 1
            this.drawCardsFromDeck(numOfDraw);
            this.playCardCount += plusPlayCard
            if(startSkill.length > 0){
                startSkill.forEach(skill => this.startSkills.push(skill))
            }
            if(endSkill.length > 0){
                endSkill.forEach((skill) => this.endSkills.push(skill))
            }
            return true
        }
    }

    public oneTurn = (n:number) => {
        // ターンを超過していたら処理しない
        if(this.totalTurns + this.extraTurn < this.currentTurn + 1){
            return
        }

        // ターン開始処理
        if(this.isStartTurnFlag){
            this.isStartTurnFlag = false;
            if(this.startSkills.length > 0){
                let SenseProps:SenseProps = {
                    parameter:0, 
                    maxHp:this.maxHp,
                    currentHp:this.currentHp,
                    IncreasedEnergyConsumption:this.IncreasedEnergyConsumption,
                    ReducedEnergyConsumption:this.ReducedEnergyConsumption,
                    gameParameterIncreace:this.parameterIncreace,
                    gameParameterDecreace:this.parameterDecreace,
                    totalTurn:this.totalTurns,
                    currentTurn:this.currentTurn,
                    extraTurn:this.extraTurn,
                    gameFavorable:this.gameFavorable, 
                    gameConcentration:this.gameConcentration, 
                    gamePerfectForm:this.gamePerfectForm,
                    gameFine:this.gameFine,
                    plusPlayCard:0,
                    numOfDraw:0,
                    startSkill:[],
                    endSkill:[]}
                for(let i:number = 0; i < this.startSkills.length; i++){
                    SenseProps = this.startSkills[i](SenseProps)
                    }
                    this.parameter += this.calcparameter(SenseProps["parameter"])
                    this.currentHp = SenseProps["currentHp"]
                    this.IncreasedEnergyConsumption = SenseProps["IncreasedEnergyConsumption"]
                    this.ReducedEnergyConsumption = SenseProps["ReducedEnergyConsumption"]
                    this.gameFavorable = SenseProps["gameFavorable"]
                    this.gameConcentration = SenseProps["gameConcentration"]
                    this.gamePerfectForm = SenseProps["gamePerfectForm"]
                    this.gameFine = SenseProps["gameFine"]
                    this.playCardCount += SenseProps["plusPlayCard"]
                    this.drawCardsFromDeck(SenseProps["numOfDraw"]);
                }
            }
        this.debug("before play card")
        if(this.playOneCard(n)){
            this.debug("after play card")
            if(this.hands[n].onlyOnce){
                this.moveHandToExclude(n)
            }else{
                this.moveHandToDiscard(n)
            }
            this.debug("after trush")
        }else{
            alert("Can't play Card!")
            return
        }

        if(this.isChangeTurn()){
            this.currentTurn += 1;
            this.isStartTurnFlag = true;
            this.gameFavorable ? this.gameFavorable -= 1 : this.gameFavorable = 0;
            this.gamePerfectForm ? this.gamePerfectForm -= 1 : this.gamePerfectForm = 0;
            this.IncreasedEnergyConsumption ? this.IncreasedEnergyConsumption -= 1 : this.IncreasedEnergyConsumption = 0;
            this.ReducedEnergyConsumption ? this.ReducedEnergyConsumption -= 1 : this.ReducedEnergyConsumption = 0;
            this.drawCardsAtTurnEnd(3);
        }
        this.debug("turn end")
    }

    public resetSenseGame() {
        this.resetGame()
        this.gameFavorable = 0
        this.gameConcentration = 0
        this.gamePerfectForm = 0
        this.gameFine = 0
        this.startSkills = []
        this.endSkills = []
    }
}