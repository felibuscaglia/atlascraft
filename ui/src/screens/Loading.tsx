import { APP_NAME } from "lib/constants/app-data";
import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { BarLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">{APP_NAME}</h1>
      <BarLoader color={PRIMARY_BRAND_COLOR} />
    </div>
  );
};

export default LoadingScreen;
