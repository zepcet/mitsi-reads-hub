// Local row-type definitions for the member panel tables.
// The auto-generated src/integrations/supabase/types.ts is intentionally left empty,
// so we cast results from the supabase client to these interfaces instead.

export type SubscriptionPlan = "none" | "reader" | "member" | "collector";
export type SubscriptionType = "individual" | "group" | "gift";
export type SubscriptionStatus = "none" | "active" | "canceled";
export type BookStatus = "want_to_read" | "reading" | "finished";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  subscription_plan: SubscriptionPlan;
  subscription_type: SubscriptionType | null;
  subscription_status: SubscriptionStatus;
  created_at?: string;
  updated_at?: string;
}

export interface BookProgress {
  id: string;
  user_id: string;
  book_club_slug: string;
  status: BookStatus;
  saved: boolean;
  updated_at?: string;
}

export interface MemberContent {
  id: string;
  title: string;
  category: string;
  body: string;
  link_url: string | null;
  event_date: string | null;
  published_at?: string;
}

export const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  none: "None",
  reader: "Reader",
  member: "Member",
  collector: "Collector",
};

export const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  none: "—",
  active: "Active",
  canceled: "Canceled",
};

export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  want_to_read: "Want to read",
  reading: "Reading",
  finished: "Finished",
};
