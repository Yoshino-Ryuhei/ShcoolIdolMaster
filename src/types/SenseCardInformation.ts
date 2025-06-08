import { CardType } from "./CardType"
import { LogicProps } from "./LogicProps"
import { Plan } from "./Plan"
import { SenseProps } from "./SenseProps"

export type SenseCardInformation = {
    plan:Plan
    type:CardType
    name:string
    desc:string
    cost:number
    parameter:number
    parameterCount:number
    fine:number
    onlyOnce:boolean
    favorable:number
    concentration:number
    perfectForm:number
    applySenseEffect:(props:SenseProps) => SenseProps
    applyLogicEffect:(props:LogicProps) => LogicProps
}