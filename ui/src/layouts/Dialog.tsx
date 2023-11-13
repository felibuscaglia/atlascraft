import { Dialog, Transition } from "@headlessui/react";
import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { Fragment } from "react";
import { ClipLoader } from "react-spinners";
import ErrorBanner from "components/Banners/Error";

interface IDialogLayoutProps {
  display: boolean;
  performingAction: boolean;
  onDialogClose: () => void;
  children: React.ReactNode;
  onButtonClick: () => void;
  title: string;
  btnText: string;
  color: "danger" | "brand";
  error?: string | string[];
}

const DialogLayout: React.FC<IDialogLayoutProps> = ({
  display,
  performingAction,
  onDialogClose,
  children,
  onButtonClick,
  title,
  btnText,
  color,
  error,
}) => {
  const btnColorClassnames =
    color === "danger"
      ? "border-transparent bg-red-100 text-red-900 focus-visible:ring-red-500 hover:bg-red-200"
      : `border-primary-brand-color bg-primary-brand-color text-secondary-brand-color hover:text-primary-brand-color hover:bg-transparent`;

  return (
    <Transition appear show={display || performingAction} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onDialogClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-secondary-brand-color p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="mb-4 text-xl font-medium leading-6"
                >
                  {title}
                </Dialog.Title>
                {error && <ErrorBanner fullWidth error={error} />}
                {children}
                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="button"
                    className={
                      "inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
                      btnColorClassnames
                    }
                    onClick={onButtonClick}
                  >
                    {performingAction ? (
                      <ClipLoader size={10} color={PRIMARY_BRAND_COLOR} />
                    ) : (
                      <span>{btnText}</span>
                    )}
                  </button>
                  <button
                    disabled={performingAction}
                    onClick={onDialogClose}
                    className="text-sm font-medium hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogLayout;
