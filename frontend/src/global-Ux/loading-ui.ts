import { Notify } from 'quasar';

type WithUIOptions = {
  loadingText?: string;
  successMessage?: string | null;
  errorMessage?: string;
  silent?: boolean;
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

    const result: T = await callback();

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
