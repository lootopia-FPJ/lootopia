import {Stage} from './stage';

export type TreasureHunt = {
  id: number;
  name: string;
  description: string;
  is_real_world: boolean;
  is_public: boolean;
  ended_at?: string;
  max_players?: number;
  entry_fee?: number;
  reward_type: string;
  digging_delay: number;
  digging_cost: number;
  is_draft: boolean;
  difficulty: number;
  created_by: number;
  stages?: Stage[];
};
