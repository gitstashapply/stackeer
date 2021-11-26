export interface UserApiResponse {
  items?: ItemsEntity[] | null;
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export interface ItemsEntity {
  badge_counts: {
    bronze: number;
    silver: number;
    gold: number;
  };
  collectives?: CollectivesEntity[] | null;
  account_id: number;
  is_employee: boolean;
  last_modified_date: number;
  last_access_date: number;
  reputation_change_year: number;
  reputation_change_quarter: number;
  reputation_change_month: number;
  reputation_change_week: number;
  reputation_change_day: number;
  reputation: number;
  creation_date: number;
  user_type: string;
  user_id: number;
  accept_rate: number;
  location: string;
  website_url: string;
  link: string;
  profile_image: string;
  display_name: string;
}
export interface CollectivesEntity {
  collective: {
    tags?: string[] | null;
    external_links?:
      | {
          type: string;
          link: string;
        }[]
      | null;
    description: string;
    link: string;
    name: string;
    slug: string;
  };
  role: string;
}

export interface QuestionsApiResponse {
  items?: ItemQuestions[] | null;
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
export interface ItemQuestions {
  tags?: string[] | null;
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  protected_date?: number | null;
  accepted_answer_id: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  last_edit_date?: number | null;
  question_id: number;
  content_license?: string | null;
  link: string;
  title: string;
  closed_date?: number | null;
  closed_reason?: string | null;
}
export interface Owner {
  account_id: number;
  reputation: number;
  user_id: number;
  user_type: string;
  accept_rate: number;
  profile_image: string;
  display_name: string;
  link: string;
}
