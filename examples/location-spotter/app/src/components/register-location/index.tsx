import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon, PlusSmIcon } from "@heroicons/react/outline";
import cn from "classnames";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import { useGeolocationStore } from "../../utils/geolocation-store";


const RegisterLocation = () => {
  const cancelButtonRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [pictureDataUri, setPictureDataUri] = useState('')
  const [cameraError,setCameraError] = useState<Error | null>(null)

  const ready = pictureDataUri

  const handleRegistration = () => {
    setPictureDataUri('')
    setOpen(false)

    const geolocation = useGeolocationStore.getState().geolocation

    console.log(geolocation,pictureDataUri)
    // TODO - send to database
  }

  const handleCancelation = () => {
    setPictureDataUri('')
    setCameraError(null)
    setOpen(false)
  }

  return (<>
    <button
      type="button"
      className="fixed right-6 bottom-10 z-[1000] inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={() => setOpen(true)}
    >
      <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
    </button>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[1010]" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-[1010] inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="text-center">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    New Spot
                  </Dialog.Title>
                </div>
                <div className="relative mt-2 flex items-center">
                  {(cameraError) && (
                    <div className="absolute w-full h-full bg-white z-10 border-2 border-gray-400 border-dashed rounded-lg p-12 flex flex-col items-center justify-center">
                      <CameraIcon className="text-gray-400 h-10 w-10"/>
                      <span className="mt-2 block text-sm font-medium text-gray-500">{cameraError?.message || 'Awaiting camera ...'}</span>
                    </div>
                  )}
                  {pictureDataUri && <img src={pictureDataUri} />}
                  {!pictureDataUri &&
                    <Camera
                      // idealResolution = {{width: 640, height: 480}}
                      idealFacingMode={'environment'}
                      isDisplayStartCameraError={false}
                      onCameraStart={() => setCameraError(null)}
                      onCameraError={setCameraError}
                      onTakePhotoAnimationDone ={setPictureDataUri} 
                    />
                  }
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className={cn(
                      {'bg-gray-300': !ready},
                      {'bg-lime-600 focus:ring-lime-500 hover:bg-lime-700': ready},
                      "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:col-start-2 sm:text-sm"
                    )}
                    disabled={!ready}
                    onClick={handleRegistration}
                  >
                    Register Spot
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={handleCancelation}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  </>)
}

export default RegisterLocation