// global/ui-core.ts

interface UILoading {
  showLoading: (text?: string) => void;
  hideLoading: () => void;
}

interface UINotify {
  success: (title: string, text?: string) => void;
  error: (text: string) => void;
  info: (text: string) => void;
}

declare const Swal: {
  fire: (options: {
    icon: 'success' | 'error' | 'info';
    title: string;
    text?: string;
    confirmButtonColor?: string;
    showConfirmButton?: boolean;
    allowOutsideClick?: boolean;
  }) => void;
};

const UI: UILoading = {
  showLoading(text = "Processing...") {
    const el = document.getElementById("globalLoading");
    const txt = document.getElementById("loadingText");

    if (txt) {
      txt.textContent = text;
    }

    el?.classList.remove("hidden");
  },

  hideLoading() {
    document.getElementById("globalLoading")?.classList.add("hidden");
  }
};

const Notify: UINotify = {
  success(title, text) {
    Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonColor: "#00ffc8"
    });
  },

  error(text) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text
    });
  },

  info(text) {
    Swal.fire({
      icon: "info",
      title: "Please wait",
      text,
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }
};

window.UI = UI;
window.Notify = Notify;
