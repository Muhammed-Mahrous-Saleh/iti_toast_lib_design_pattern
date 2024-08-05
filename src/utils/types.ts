import { ToastProps } from "../components/Toast";

export type ToastType = Pick<ToastProps, "id" | "message" | "variant">;
export type Observer<T> = (data: T) => void;
