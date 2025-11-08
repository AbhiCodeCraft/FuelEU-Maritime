export interface PoolMemberDraft { shipId: string; cbBefore: number; }
export interface PoolResultMember { shipId: string; cbBefore: number; cbAfter: number; }
export interface PoolResult { year: number; members: PoolResultMember[]; sumAfter: number; }
