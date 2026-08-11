import teamData from "@/data/team.json";
import rosterData from "@/data/team-roster.json";
import type { RosterEntry, TeamMember } from "@/types/team";

const TEAM = teamData as TeamMember[];
const ROSTER = rosterData as RosterEntry[];

export function getAllTeamMembers(): TeamMember[] {
  return TEAM;
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return TEAM.find((m) => m.id === id);
}

export function getRoster(): { member: TeamMember; hierarchy: number }[] {
  const byId = new Map(TEAM.map((m) => [m.id, m]));
  return ROSTER.slice()
    .sort((a, b) => a.order - b.order)
    .map((r) => ({ member: byId.get(r.id), hierarchy: r.hierarchy }))
    .filter((entry): entry is { member: TeamMember; hierarchy: number } => Boolean(entry.member));
}
