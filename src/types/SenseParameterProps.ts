export type SenseParameterProps = {
    gameFavorable:number, 
    gameConcentration:number, 
    gamePerfectForm:number,
    // パラメータ上昇量増加
    gameParameterIncreace
    // パラメータ上昇量減少
    gameParameterDecreace
    //　好調倍率
    favorableEffect?:number
    //　集中倍率
    concentratedEffect?: number,
}