import NavBar from "@/components/landing/NavBar";
import HashNavigator from "@/components/landing/HashNavigator";
import MainPageWrapper from "@/components/landing/MainPageWrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HashNavigator />
      <NavBar />
      <MainPageWrapper />
    </div>
  );
}
