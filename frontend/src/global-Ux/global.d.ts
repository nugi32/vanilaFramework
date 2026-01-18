export {};

declare global {
  interface Window {
    UI: {
      showLoading: (text?: string) => void;
      hideLoading: () => void;
    };

    Notify: {
      success: (title: string, text?: string) => void;
      error: (text: string) => void;
      info: (text: string) => void;
    };
  }
}
