export interface AppTheme {
  componentSize: "small" | "middle" | "large";
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorPrimaryBg: string;
  colorPrimaryBorder: string;
  colorSuccess: string;
  colorSuccessHover: string;
  colorSuccessActive: string;
  colorSuccessBg: string;
  colorSuccessBorder: string;
  colorWarning: string;
  colorWarningHover: string;
  colorWarningActive: string;
  colorWarningBg: string;
  colorWarningBorder: string;
  colorError: string;
  colorErrorHover: string;
  colorErrorActive: string;
  colorErrorBg: string;
  colorErrorBorder: string;
  colorInfo: string;
  colorInfoHover: string;
  colorInfoActive: string;
  colorInfoBg: string;
  colorInfoBorder: string;
  borderRadius: number;
}

export const appTheme: AppTheme = {
  componentSize: "middle",
  colorPrimary: "#1677ff",
  colorPrimaryHover: "#4096ff",
  colorPrimaryActive: "#0958d9",
  colorPrimaryBg: "#e6f4ff",
  colorPrimaryBorder: "#91caff",
  colorSuccess: "#52c41a",
  colorSuccessHover: "#73d13d",
  colorSuccessActive: "#389e0d",
  colorSuccessBg: "#f6ffed",
  colorSuccessBorder: "#b7eb8f",
  colorWarning: "#faad14",
  colorWarningHover: "#ffc53d",
  colorWarningActive: "#d48806",
  colorWarningBg: "#fffbe6",
  colorWarningBorder: "#ffe58f",
  colorError: "#ff4d4f",
  colorErrorHover: "#ff7875",
  colorErrorActive: "#d9363e",
  colorErrorBg: "#fff2f0",
  colorErrorBorder: "#ffccc7",
  colorInfo: "#1677ff",
  colorInfoHover: "#4096ff",
  colorInfoActive: "#0958d9",
  colorInfoBg: "#e6f4ff",
  colorInfoBorder: "#91caff",
  borderRadius: 6,
};
