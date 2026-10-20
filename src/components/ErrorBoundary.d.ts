import type { ComponentType, PropsWithChildren } from "react";

declare const ErrorBoundary: ComponentType<
  PropsWithChildren<{ name?: string }>
>;

export default ErrorBoundary;
