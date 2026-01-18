type WithUIOptions = {
  loadingText?: string;
  successMessage?: string | null;
  errorMessage?: string;
  silent?: boolean;
};

declare const UI: {
  showLoading: (text?: string) => void;
  hideLoading: () => void;
};

declare const Notify: {
  success: (title: string, text?: string) => void;
  error: (text: string) => void;
  info: (text: string) => void;
};

export async function withUI<T>(
  callback: () => Promise<T>,
  options: WithUIOptions = {}
): Promise<T> {
  const {
    loadingText = "Processing...",
    successMessage = null,
    errorMessage = "Something went wrong",
    silent = false
  } = options;

  try {
    if (!silent) {
      UI.showLoading(loadingText);
      Notify.info(loadingText);
    }

    const result = await callback();

    if (!silent) {
      UI.hideLoading();
      if (successMessage) {
        Notify.success("Success", successMessage);
      }
    }

    return result;
  } catch (err: unknown) {
    console.error(err);

    if (!silent) {
      UI.hideLoading();

      const message =
        err instanceof Error ? err.message : errorMessage;

      Notify.error(message);
    }

    throw err;
  }
}
