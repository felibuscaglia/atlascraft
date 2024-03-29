import { HttpStatusCode } from "axios";
import PageHead from "components/PageHead";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useState, useEffect } from "react";
import ErrorScreen from "screens/Error";
import LoadingScreen from "screens/Loading";

interface IAuthGuardProps<T> {
  children: (
    data: T,
    updateData: React.Dispatch<React.SetStateAction<T | null>>,
  ) => React.ReactNode;
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
        setNotFound(err.response?.status === HttpStatusCode.NotFound);
        setLoading(false);
      });
  }, [apiPath, authApiClient]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (notFound) {
    return (
      <ErrorScreen msg="Uh-oh. We couldn't find what you're looking for." />
    );
  }

  // if apiData === null even though notFound !== true and loading !== true, then that's def an error.
  if (apiData === null) {
    return (
      <ErrorScreen msg="Uh-oh. An unexpected error occurred. Please, try again later." />
    );
  }

  return (
    <>
      {displayPageHead && <PageHead />}
      {children(apiData, setApiData)}
    </>
  );
};

export default AuthGuard;
