import PageHead from "components/PageHead";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useState, useEffect } from "react";
import LoadingScreen from "screens/Loading";
import NotFoundScreen from "screens/NotFound";

interface IAuthGuardProps<T> {
  children: (data: T | null) => React.ReactNode;
  apiPath: string;
  displayPageHead?: boolean;
}

const AuthGuard = <T,>({
  children,
  apiPath,
  displayPageHead = true,
}: IAuthGuardProps<T>) => {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [apiData, setApiData] = useState<T | null>(null);

  const authApiClient = useAxiosAuth();

  useEffect(() => {
    authApiClient
      .get(apiPath)
      .then(({ data }) => {
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        setNotFound(err.response?.status);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (notFound) {
    return <NotFoundScreen />;
  }

  return (
    <>
      {displayPageHead && <PageHead />}
      {children(apiData)}
    </>
  );
};

export default AuthGuard;
