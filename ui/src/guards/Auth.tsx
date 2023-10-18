import PageHead from "components/PageHead";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useState, useEffect } from "react";
import LoadingScreen from "screens/Loading";

interface IAuthGuardProps<T> {
  children: (data: T | null) => React.ReactNode;
  apiPath: string;
}

const AuthGuard = <T,>({ children, apiPath }: IAuthGuardProps<T>) => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<T | null>(null);

  const authApiClient = useAxiosAuth();

  useEffect(() => {
    authApiClient
      .get(apiPath)
      .then(({ data }) => {
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err)); // TODO: Handle errors.
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <PageHead />
      {children(apiData)}
    </div>
  );
};

export default AuthGuard;
