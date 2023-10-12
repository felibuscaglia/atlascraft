interface IAuthFormInfoBannerProps {
  infoMsg: string;
}

const AuthFormInfoBanner: React.FC<IAuthFormInfoBannerProps> = ({
  infoMsg,
}) => {
  return (
    <div className="capitalize-first w-1/3 rounded border-2 border-primary-brand-color bg-primary-brand-color p-1 text-center text-base font-semibold text-white">
      {infoMsg}
    </div>
  );
};

export default AuthFormInfoBanner;
