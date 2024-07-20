import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {toast, Toaster} from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { BookingData } from "@/types/type"
import { usePostBook } from "@/hooks/usePostBookQandA";


interface ModalProps {
    closeModal: () => void;
    isModalOpen: boolean;
  }
  
const DialogModal = ({ closeModal, isModalOpen }: ModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<BookingData>();
      const { postBook } = usePostBook();
      const onSubmit: SubmitHandler<BookingData> = (data) => {
        toast
          .promise(postBook(data), {
            loading: "Sending...",
            success: "Success! We will contact you soon",
            error: "Something went wrong",
          })
          .then(() => {
            closeModal();
          });
      };



    return (
        <>
          <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className={`text-md leading-6 text-gray-900 text-center
                                            text-lg md:text-2xl font-bold my-5
                                            `}
                      >
                        Book an orientation
                      </Dialog.Title>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                          className={`mt-2 max-w-screen-md m-auto`}
                        >
                          <div className="flex flex-col items-start">
                            <label className="font-bold">Full Name</label>
                            <div className="flex flex-col w-full">
                              <input
                                className="border border-black/10 rounded p-2"
                                type="text"
                                placeholder="Full name"
                                {...register("fullName", { required: true })}
                              />
                              {errors.fullName && (
                                <span className="text-red-500">This field is required</span>
                              )}
                            </div>
                            <label className="font-bold mt-7">Email</label>
                            <div className="flex flex-col w-full">
                              <input
                                className="border border-black/10 rounded p-2 w-full"
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: true })}
                              />
                              {errors.email && (
                                <span className="text-red-500">This field is required</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                          <button
                            // onSubmit={notify}
                            type="submit"
                            className="mt-7 inline-flex justify-center rounded-md border border-transparent bg-yellow px-5 py-3 text-sm font-bold text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Book Now
                          </button>
                        
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Toaster/>
        </>
      );
}


export default DialogModal;