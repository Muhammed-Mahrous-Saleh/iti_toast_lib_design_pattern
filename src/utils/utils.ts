import { ToastType, Observer } from "./types";

class Observable<T> {
    observers: Observer<T>[] = [];
    subscribe(observer: Observer<T>) {
        this.observers.push(observer);

        return () => {
            this.observers = this.observers.filter((o) => o !== observer);
        };
    }

    notify(data: T) {
        this.observers.forEach((obs) => obs(data));
    }

    clear() {
        this.observers.forEach((obs) => obs(null as unknown as T));
    }
}

export const toastObservable = new Observable<ToastType>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toast(message: string) {
    toastObservable.notify({
        id: Math.random(),
        message: message,
        variant: "default",
    });
}

toast.success = (message: string) => {
    toastObservable.notify({
        id: Math.random(),
        message: message,
        variant: "success",
    });
};

toast.error = (message: string) => {
    toastObservable.notify({
        id: Math.random(),
        message: message,
        variant: "error",
    });
};

toast.dismissAll = () => {
    toastObservable.clear();
};
