import { LogicProps } from "./LogicProps";
import { SkillType } from "./SkillType";

export type LogicSkillProps = {
  name: string;
  type: SkillType;
  // nターン後に発動(永続効果は-1)
  trun: number;
  //n回発動
  count: number;
  // 条件(アクティブカード使用時など)
  condition: string;
  skill: (props: LogicProps) => LogicProps;
};
