import { GlobeIcon } from "@heroicons/react/outline"

const WaitingForGeolocation = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="flex flex-col justify-center">
      <GlobeIcon className="mx-auto animate-spin w-16 h-16 text-gray-700"/>
      <p className="font-normal text-lg text-gray-700">
        Waiting for current geolocation ...
      </p>
    </div>
  </div>
)

export default WaitingForGeolocation