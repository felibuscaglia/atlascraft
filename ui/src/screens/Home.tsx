import AuthGuard from "guards/Auth";

const HomeScreen = () => {
  return (
    <AuthGuard<any> apiPath="">{(data) => <h1>Home screen!</h1>}</AuthGuard>
  );
};

export default HomeScreen;
