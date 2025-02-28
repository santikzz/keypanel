import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { number } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toastDark = { background: "#09090b", color: "#ffffff", border: '#18181b' };

export const durationUnitsValues = {
  hours: 1,           // 1 hour
  days: 24,           // 24 hours in a day
  weeks: 168,         // 168 hours in a week
  months: 720,        // 720 hours in a month
  years: 8760,        // 8760 hours in a year
  lifetime: 1,       // lifetime
};

export const calculateDuration = (unit: string, value: number) => {
  if (unit === "lifetime") return 1;
  return durationUnitsValues[unit] * value * 3600;
}

export const formatDuration = (seconds: number, isLifetime: boolean = false): string => {
  if (isLifetime) return "lifetime";
  if (seconds < 60) return `${seconds} seconds`;

  const units = [
    { label: "year", value: 60 * 60 * 24 * 365 },
    { label: "month", value: 60 * 60 * 24 * 30 },
    { label: "week", value: 60 * 60 * 24 * 7 },
    { label: "day", value: 60 * 60 * 24 },
    { label: "hour", value: 60 * 60 },
    { label: "minute", value: 60 }
  ];

  for (const { label, value } of units) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) return `${amount} ${label}${amount > 1 ? "s" : ""}`;
  }

  return seconds + " seconds";
};

export const durationUnits = [{
  label: "Hours",
  value: "hours"
},
{
  label: "Days",
  value: "days"
},
{
  label: "Weeks",
  value: "weeks"
},
{
  label: "Months",
  value: "months"
},
{
  label: "Years",
  value: "years"
},
{
  label: "Lifetime",
  value: "lifetime"
},
] as const;
