import type {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";

export type ResumeAppearance = {
  fontFamily: string;
  headingFontFamily: string;
  fontScale: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
};

export type ResumeContextValue = {
  resumeData: Record<string, unknown>;
  setResumeData: Dispatch<SetStateAction<Record<string, unknown>>>;
  appearance: ResumeAppearance;
  setAppearance: Dispatch<SetStateAction<ResumeAppearance>>;
};

export function ResumeProvider({ children }: { children: ReactNode }): ReactElement;
export function useResume(): ResumeContextValue;
