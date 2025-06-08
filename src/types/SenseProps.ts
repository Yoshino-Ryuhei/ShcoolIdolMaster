export type SenseProps = {
    parameter:number,
    maxHp:number,
    currentHp:number,
    IncreasedEnergyConsumption:number,
    ReducedEnergyConsumption:number,
    gameParameterIncreace:number,
    gameParameterDecreace:number,
    totalTurn:number,
    currentTurn:number,
    extraTurn:number,
    gameFavorable:number,
    gameConcentration:number,
    gamePerfectForm:number
    gameFine:number
    plusPlayCard:number
    numOfDraw:number,
    startSkill:Array<(props:SenseProps) => SenseProps>
    endSkill:Array<(props:SenseProps) => SenseProps>
}