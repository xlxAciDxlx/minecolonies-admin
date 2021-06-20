type CitizenAge = "adult" | "child";

type CitizenJob = "Builder";

type CitizenSex = "female" | "male";

type CitizenSkills =
	| "Adaptability"
	| "Athletics"
	| "Agility"
	| "Creativity"
	| "Focus"
	| "Dexterity"
	| "Intelligence"
	| "Mana"
	| "Knowledge"
	| "Stamina"
	| "Strength";

type CitizenStatus = "Idle" | "Sleeping zZZ" | "Working";

type Location = { x: number; y: number; z: number };

type SkillData = { level: number; xp: number };

export const DEFAULT_SKILL_VALUE: Citizen["skills"]["Adaptability"] = { level: 0, xp: 0 };

export const DEFAULT_SKILLS: Citizen["skills"] = {
	Adaptability: DEFAULT_SKILL_VALUE,
	Agility: DEFAULT_SKILL_VALUE,
	Athletics: DEFAULT_SKILL_VALUE,
	Creativity: DEFAULT_SKILL_VALUE,
	Dexterity: DEFAULT_SKILL_VALUE,
	Focus: DEFAULT_SKILL_VALUE,
	Intelligence: DEFAULT_SKILL_VALUE,
	Knowledge: DEFAULT_SKILL_VALUE,
	Mana: DEFAULT_SKILL_VALUE,
	Stamina: DEFAULT_SKILL_VALUE,
	Strength: DEFAULT_SKILL_VALUE
};

type WorkData = {
	location: Location;
	level: number;
	// TODO: Properly type this
	type: string;
};

export type Citizen = {
	age: CitizenAge;
	happiness: number;
	id: number;
	job?: CitizenJob;
	location: Location;
	name: string;
	saturation: number;
	sex: CitizenSex;
	skills: { [Key in CitizenSkills]: SkillData };
	status: CitizenStatus;
	work?: WorkData;
};

export type Colony = {
	active: boolean;
	citizens: Citizen[];
	happiness: number;
	id: number;
	location: Location & { world: string };
	maxCitizens: number;
	mourning: boolean;
	name: string;
	raid: boolean;
	// TODO: Properly type this
	style: "caledonia";
};

type BuildingFootprint = { corner1: Location; corner2: Location; mirror: boolean; rotation: number };

type BuildingStyle = "wooden";

type BuildingType = "townhall";

export type Building = {
	built: boolean;
	citizens: Citizen[];
	footprint: BuildingFootprint;
	guarded: boolean;
	level: number;
	location: Location;
	maxLevel: number;
	name: string;
	priority: number;
	storageBlocks: number;
	style: BuildingStyle;
	type: BuildingType;
	wip: boolean;
};
